import {View, Text, Modal, Image, Alert, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import Section from '../components/Section';
import {FlashList} from '@shopify/flash-list';
import TImage from '../components/ui/TImage';
import {getBackdropImageURL, getPosterImageURL} from '../libs/tmdb';
import tw from '../libs/tailwind';
import {TouchableOpacity} from 'react-native';
import TText from '../components/ui/TText';
import Icons from '../components/ui/vector-icons';
import ToggleButton from '../components/ui/ToggleButton';
import {hp, wp} from '../libs/utils/Scaling';
import RNFS from 'react-native-fs';
import {requestStoragePermission} from '../libs/permissions';
export default function ImageScreen({...props}) {
  const {list, type, label} = props.route.params;
  const [active, setActive] = useState<any>(null);

  const labels = {
    poster: 'Posters',
    backdrop: 'Backdrops',
    profile: 'Person Images',
  };

  const activeImageURI =
    type == 'poster'
      ? getPosterImageURL(active?.file_path, 'original')
      : getBackdropImageURL(active?.file_path, 'original');

  const handleDownload = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Storage permission not granted');
      return;
    }
    // Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).getAbsolutePath()
    const imageUrl = activeImageURI; // Replace with your image URL
    const fileName = `${label.split(' ').join('_').toLowerCase()}_${
      active?.file_path.split('/')[1]
    }`; // Desired name of the saved image
    const downloadDest = `${RNFS.ExternalStorageDirectoryPath}/Download/plexbook/${fileName}`; // Save to local app folder
    if (await RNFS.existsRes(downloadDest)) {
      return ToastAndroid.show('File already exists', ToastAndroid.SHORT);
    } else if (
      await RNFS.exists(
        RNFS.ExternalStorageDirectoryPath + '/Download/plexbook',
      )
    ) {
      return ToastAndroid.show('Folder not created', ToastAndroid.SHORT);
    }
    RNFS.downloadFile({
      fromUrl: imageUrl,
      toFile: downloadDest,
    })
      .promise.then(res => {
        console.log('Image downloaded successfully:', res);
        ToastAndroid.show(
          `Image saved to: ${downloadDest}`,
          ToastAndroid.SHORT,
        );
      })
      .catch(err => {
        ToastAndroid.show(
          'Error while downloading the image: ' + String(err),
          ToastAndroid.LONG,
        );
      });
  };
  console.log(active);
  return (
    <Section label={type === 'backdrop' ? 'Backdrops' : 'Posters'}>
      <FlashList
        data={list}
        estimatedItemSize={100}
        numColumns={type === 'poster' ? 3 : 1}
        renderItem={({item}) => {
          const imageURI =
            type == 'poster'
              ? getPosterImageURL(item?.file_path, 'w500')
              : getBackdropImageURL(item?.file_path, 'w780');
          return (
            <TouchableOpacity
              disabled // due to downloading to storage api is broken
              onPress={() => {
                setActive(item);
              }}>
              <TImage
                source={{uri: imageURI}}
                style={tw.style(
                  ` h-40 my-2  rounded-lg`,
                  type === 'poster' ? ` w-24` : `w-full`,
                )}
              />
            </TouchableOpacity>
          );
        }}
      />
      <Modal
        transparent
        animationType="fade"
        visible={active !== null}
        onDismiss={() => {
          setActive(null);
        }}>
        <View style={tw`bg-black/80 flex-1 h-full`}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tw`ml-auto p-1`}
            onPress={() => {
              setActive(null);
            }}>
            <Icons.AntDesign
              name="close"
              size={25}
              style={tw`bg-primary mr-auto rounded-full p-1`}
            />
          </TouchableOpacity>

          <View style={tw` flex-1  justify-center  gap-2`}>
            <Image
              source={{
                uri: activeImageURI,
              }}
              style={[
                tw.style(`rounded-lg m-2   `),
                {
                  aspectRatio: active?.aspect_ratio,
                },
              ]}
            />
            <View>
              <ToggleButton
                onPress={() => {
                  handleDownload();
                }}
                style={tw`mx-auto`}>
                Download
              </ToggleButton>
            </View>
          </View>
        </View>
      </Modal>
    </Section>
  );
}
