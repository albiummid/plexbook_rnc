import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Linking,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {getVersion} from 'react-native-device-info';
import {
  closeSheet,
  openSheet,
  RNActionSheet,
} from '../../components/sheets/ActionSheet';
import ToggleButton from '../../components/ui/ToggleButton';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import Icons from '../../components/ui/vector-icons';
import {api} from '../../libs/api';
import tw from '../../libs/tailwind';

export default function Versions() {
  const {data: listData, ...vReq} = useQuery({
    queryKey: ['version-list'],
    queryFn: async () => {
      const {data} = await api.get('/auth/version/list');
      console.log(data);
      return data.result;
    },
  });
  const [text, setText] = useState('');
  const handlePublish = async () => {
    const versionParams = text.split('.');
    if (versionParams.length !== 3) {
      return Alert.alert('Invalid version', 'Please enter a valid version.');
    }
    if (versionParams.some(x => String(x).length !== 1)) {
      return Alert.alert('Invalid version', 'Please enter a valid version.');
    }
    await api
      .post('/auth/version/publish', {version: text})
      .then(x => {
        vReq.refetch();
        closeSheet('publish-version');
      })
      .catch(e => {
        ToastAndroid.show(String(e), 1000);
      });
  };
  return (
    <View style={tw`mt-5`}>
      <TView
        stack="hStack"
        justifyContent="between"
        mX={5}
        style={tw`p-2`}
        alignItems="center">
        <TText style={tw`text-lg text-primary`}>Version list</TText>
        <ToggleButton
          onPress={() => {
            openSheet('publish-version');
          }}>
          Publish version
        </ToggleButton>
      </TView>
      <FlatList
        data={listData?.list}
        renderItem={({item}) => (
          <Pressable
            onLongPress={() => {
              Alert.alert('Delete', 'Do you want to delete ?', [
                {
                  text: 'Delete',
                  isPreferred: true,
                  onPress: () => {
                    api
                      .delete('/auth/version/' + item._id)
                      .then(d => {
                        vReq.refetch();
                      })
                      .catch(e => {
                        ToastAndroid.show(String(e), 1000);
                      });
                  },
                },
                {text: 'No'},
              ]);
            }}
            style={tw`m-2 border border-primary rounded-lg p-3 gap-y-2`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-white`}>App v{item.version}</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.canOpenURL(item.changelog).then(isOpenable => {
                    if (isOpenable) {
                      Linking.openURL(item.changelog);
                    }
                  });
                }}
                style={tw`ml-auto flex-row gap-2`}>
                <Icons.MaterialCommunityIcons
                  name="clipboard-text-outline"
                  size={18}
                  style={tw`text-blue-400`}
                />

                <Text style={tw`ml-auto text-blue-400`}>Changelog</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`border-t  border-white`}>
              {item.files.map((x, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(x.fileLink);
                    }}
                    key={x._id}
                    style={tw`my-2 flex-row justify-between flex-wrap`}>
                    <Text style={tw`text-white underline `}>{x.fileName}</Text>
                    <Text style={tw`text-white `}>
                      {x.fileSize.includes('MB') ? x.fileSize : 'N/A'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        )}
      />
      <RNActionSheet sheetId="publish-version" label="Publish version">
        <TextInput
          value={text}
          onChangeText={t => {
            setText(t);
          }}
          style={tw`px-3 py-1 border rounded-lg`}
          placeholder={`ex. ` + getVersion()}
        />
        <TouchableOpacity onPress={handlePublish}>
          <Text style={tw`px-4 py-1 border rounded-lg mx-auto my-2`}>
            Publish
          </Text>
        </TouchableOpacity>
      </RNActionSheet>
    </View>
  );
}
