import {View, Text, Modal, Image, Alert, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import Section from '../components/Section';
import {FlashList} from '@shopify/flash-list';
import TImage from '../components/ui/TImage';
import {
  getBackdropImageURL,
  getLogoImageURL,
  getPosterImageURL,
  getProfileImageURL,
  getStillImageURL,
} from '../libs/tmdb';
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
    tagged_images: 'Tagged Images',
  };

  const activeImageURI =
    type === 'poster'
      ? getPosterImageURL(active?.file_path, 'original')
      : type === 'backdrop'
      ? getBackdropImageURL(active?.file_path, 'original')
      : type === 'profile'
      ? getProfileImageURL(active?.file_path, 'original')
      : type === 'tagged_images'
      ? getStillImageURL(active?.file_path, 'original')
      : getLogoImageURL(active?.file_path, 'w300');

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
  return (
    <Section label={labels[type]}>
      <FlashList
        data={list}
        estimatedItemSize={20}
        numColumns={['poster', 'profile'].includes(type) ? 3 : 1}
        renderItem={({item}) => {
          const imageURI =
            type === 'poster'
              ? getPosterImageURL(item?.file_path, 'w500')
              : type === 'backdrop'
              ? getBackdropImageURL(item?.file_path, 'w780')
              : type === 'profile'
              ? getProfileImageURL(item?.file_path, 'w500')
              : type === 'tagged_images'
              ? getStillImageURL(item?.file_path, 'original')
              : getLogoImageURL(item?.file_path, 'w300');
          return (
            <TouchableOpacity
              onPress={() => {
                setActive(item);
              }}>
              <TImage
                source={{uri: imageURI}}
                style={tw.style(
                  ` h-40 my-2  rounded-lg`,
                  ['poster', 'profile'].includes(type) ? ` w-24` : `w-full`,
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
          <View style={tw` my-auto  gap-2`}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={tw` ml-auto mr-2 `}
              onPress={() => {
                setActive(null);
              }}>
              <Icons.AntDesign
                name="close"
                size={25}
                style={tw`bg-primary mr-auto rounded-full p-1`}
              />
            </TouchableOpacity>
            <Image
              source={{
                uri: activeImageURI,
              }}
              style={[
                tw.style(`rounded-lg mx-2   `),
                {
                  aspectRatio: active?.aspect_ratio,
                },
              ]}
            />
            {/* <View>
              <ToggleButton
                onPress={() => {
                  handleDownload();
                }}
                style={tw`mx-auto`}>
                Download
              </ToggleButton>
            </View> */}
          </View>
        </View>
      </Modal>
    </Section>
  );
}
