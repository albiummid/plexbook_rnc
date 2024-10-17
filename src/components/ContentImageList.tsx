import {FlashList} from '@shopify/flash-list';
import React, {PropsWithChildren, useState} from 'react';
import {Image, ImageBackground, Modal, TouchableOpacity} from 'react-native';
import tw from '../libs/tailwind';
import {
  getBackdropImageURL,
  getPosterImageURL,
  useContentImages,
} from '../libs/tmdb';
import Section from './Section';
import Skelton from './ui/Skelton';
import TText from './ui/TText';
import TView from './ui/TView';
import {router} from '../libs/navigation/navigator';
import TImage from './ui/TImage';

export default function ContentImageList(
  props: PropsWithChildren<{
    id: number;
    contentKind: 'movie' | 'tv';
    label: string;
  }>,
) {
  const {data: images, ...req} = useContentImages(props.id, props.contentKind);
  console.log({...images, posters: [], backdrops: [], logos: []});
  const ImageCard = ({
    type,
    lists,
    isSuccess,
  }: {
    type: 'poster' | 'backdrop';
    lists: {posters: any[]; backdrops: any[]};
    isSuccess: boolean;
  }) => {
    const imageList = type === 'poster' ? lists?.posters : lists?.backdrops;
    return (
      <Skelton
        style={tw.style(
          ` rounded-lg border border-primary`,
          type === 'poster' ? 'h-40 w-28' : 'h-full w-full flex-1',
        )}
        visible={isSuccess}>
        <TouchableOpacity
          onPress={() => {
            router.push('image_screen', {
              type,
              list: imageList,
              label: props.label,
            });
          }}>
          <TImage
            blurRadius={2}
            style={tw.style(
              `h-full w-full rounded-lg`,
              type === 'poster' ? 'w-28' : 'w-full',
            )}
            source={{
              uri:
                type === 'poster'
                  ? getPosterImageURL(imageList[0]?.file_path, 'w500')
                  : getBackdropImageURL(imageList[0]?.file_path, 'w780'),
            }}
          />
          <TText
            style={tw`text-white text-center absolute bottom-0 mx-auto w-full bg-black/60 p-2 `}
            color={'white'}>
            {images?.posters?.length} Poster
          </TText>
        </TouchableOpacity>
      </Skelton>
    );
  };

  return (
    <Section label={'Images'} labelColor="white">
      <TView stack="hStack" style={tw`gap-2`} mX={8}>
        <ImageCard lists={images} type="poster" isSuccess={req.isSuccess} />
        <ImageCard lists={images} type="backdrop" isSuccess={req.isSuccess} />
      </TView>
    </Section>
  );
}
