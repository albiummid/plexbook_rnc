import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as RNFS from 'react-native-fs';

import {ProgressBar} from '@react-native-community/progress-bar-android';
import {
  getVersion,
  supported32BitAbisSync,
  supported64BitAbisSync,
  supportedAbisSync,
} from 'react-native-device-info';
import {api} from '../libs/api';
import {checkInstallPermission} from '../libs/permissions';
import tw from '../libs/tailwind';
import {compareVersions} from '../libs/utils/helpers';
import {openSheet, RNActionSheet} from './sheets/ActionSheet';
import {showToast} from './ui/FloatingToast';
import Icons from './ui/vector-icons';
export default function UpdateChecker() {
  const [downloadProgress, setDownloadProgress] = useState('0');
  const {data: latestVersion} = useQuery({
    queryKey: ['latest-version'],
    queryFn: async () => {
      let {data} = await api.get('/auth/version/latest');
      return data.result;
    },
  });

  const [updateFile, setUpdateFile] = useState<{
    architecture: string;
    fileLink: string;
    fileSize: string;
    fileName: string;
  } | null>(null);

  const [isVersionTempered, setIsVersionTempered] = useState(false);

  useEffect(() => {
    if (!latestVersion) return;
    let comparedResult = compareVersions(latestVersion.version, getVersion());
    const hasUpdate = comparedResult !== 'equal';
    setIsVersionTempered(
      process.env.NODE_ENV !== 'development' && comparedResult === 'less',
    );

    if (hasUpdate) {
      const arch64 = supported64BitAbisSync();
      const arch32 = supported32BitAbisSync();
      let file;
      if (arch64.length) {
        file = latestVersion.files.find((x: any) =>
          arch64.includes(x.architecture),
        );
      } else {
        file = latestVersion.files.find((x: any) =>
          arch32.includes(x.architecture),
        );
      }

      if (!file) {
        file = latestVersion.files.find(
          (x: any) => x.architecture === 'universal',
        );
      }
      setUpdateFile(file);
      openSheet('update-checker');
    }
  }, [latestVersion]);
  const openAPK = async (filePath: string) => {
    if (Platform.OS === 'android') {
      const res = await checkInstallPermission();
      if (!res) return;
      Linking.openURL(`file://${filePath}`).catch(err =>
        Alert.alert('Error', 'Failed to open the APK file.'),
      );
    } else {
      Alert.alert('Error', 'APK installation is only supported on Android.');
    }
  };
  const [downloadStatus, setDownloadStatus] = useState('idle');
  const handleDownload = async () => {
    if (!updateFile) return;
    let filePath = RNFS.DocumentDirectoryPath + updateFile?.fileName;
    let isExists = await RNFS.exists(filePath);

    if (isExists) {
      openAPK(filePath);
    }

    if (downloadStatus === 'ended') {
      openAPK(filePath);
      return;
    }

    if (!isExists) {
      RNFS.downloadFile({
        fromUrl: updateFile?.fileLink,
        toFile: filePath,
        progress: res => {
          setDownloadStatus('started');
          let pgs = (res.bytesWritten / res.contentLength).toFixed(2);
          setDownloadProgress(pgs);
        },
        progressDivider: 1,
      })
        .promise.then(async result => {
          setDownloadStatus('ended');
          setDownloadProgress('1');
          if (result.statusCode == 200) {
            openAPK(filePath);
          }
        })
        .catch(e => {
          showToast({message: String(e), status: 'error'});
        });
    }
  };

  if (!updateFile) return null;
  return (
    <RNActionSheet sheetId="update-checker">
      <View style={tw`mx-auto mt-5`}>
        <Text style={tw`text-center text-base font-bold mb-1`}>
          Update available!
        </Text>
        <Text style={tw`text-center text-xs `}>
          Current version : {getVersion()}
        </Text>
        <Text style={tw`text-center text-xs mb-2`}>
          {moment(latestVersion?.createdAt).format('MMMM DD [at] hh:mm A UTC')}
        </Text>
      </View>

      <TouchableOpacity
        style={tw`flex-row mx-2 gap-2 items-center my-2 bg-gray-100 px-4 py-3 rounded-lg`}>
        <Icons.Ionicons name="logo-apple-appstore" size={18} />
        <Text>Name</Text>
        <Text style={tw`ml-auto`}>{updateFile?.fileName}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row mx-2 gap-2 items-center my-2 bg-gray-100 px-4 py-3 rounded-lg`}>
        <Icons.MaterialIcons name="devices" size={18} />
        <Text>Architecture</Text>
        <Text style={tw`ml-auto`}>{supportedAbisSync().join(',')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row mx-2 gap-2 items-center my-2 bg-gray-100 px-4 py-3 rounded-lg`}>
        <Icons.AntDesign name="infocirlceo" size={18} />
        <Text>Version</Text>
        <Text style={tw`ml-auto`}>{latestVersion.version}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row mx-2 gap-2 items-center my-2 bg-gray-100 px-4 py-3 rounded-lg`}>
        <Icons.AntDesign name="infocirlceo" size={18} />
        <Text>Update size</Text>
        <Text style={tw`ml-auto`}>{updateFile?.fileSize}</Text>
      </TouchableOpacity>

      <View
        style={tw`flex-row mx-2 gap-2 items-center my-2 bg-gray-100 px-4 py-3 rounded-lg`}>
        <Icons.MaterialCommunityIcons name="clipboard-text-outline" size={18} />
        <Text>Changelog</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.canOpenURL(latestVersion.changelog).then(isOpenable => {
              if (isOpenable) {
                Linking.openURL(latestVersion.changelog);
              }
            });
          }}
          style={tw`ml-auto`}>
          <Text style={tw`ml-auto text-blue-400`}>Tap here to read</Text>
        </TouchableOpacity>
      </View>
      <View style={tw.style(`mx-4`, downloadStatus === 'idle' && 'hidden')}>
        <ProgressBar
          indeterminate={false}
          color={'black'}
          progress={Number(downloadProgress)}
          styleAttr="Horizontal"
        />
        <Text style={tw`text-center`}>{Number(downloadProgress) * 100}%</Text>
      </View>

      <TouchableOpacity
        disabled={downloadStatus === 'started'}
        onPress={handleDownload}
        style={tw`gap-2 w-1/2 mx-auto items-center my-2 bg-gray-300 px-4 py-2 rounded-lg`}>
        <Text style={tw` text-center mx-auto`}>
          {downloadStatus == 'idle'
            ? 'Download'
            : downloadStatus === 'started'
            ? 'Downloading'
            : downloadStatus === 'ended'
            ? 'Open'
            : 'Download again.'}
        </Text>
      </TouchableOpacity>
    </RNActionSheet>
  );
}
