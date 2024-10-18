import {FlashList} from '@shopify/flash-list';
import React, {PropsWithChildren, useState} from 'react';
import {Image, ImageBackground, Modal, TouchableOpacity} from 'react-native';
import tw from '../libs/tailwind';
import {
  getBackdropImageURL,
  getLogoImageURL,
  getPosterImageURL,
  getProfileImageURL,
  getStillImageURL,
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
    contentKind: 'movie' | 'tv' | 'person';
    label: string;
  }>,
) {
  const {data: images, ...req} = useContentImages({
    id: props.id,
    contentKind: props.contentKind,
    personTaggedImages: false,
  });
  const {data: taggedImages, ...taggedImagesReq} = useContentImages(
    {
      id: props.id,
      contentKind: props.contentKind,
      personTaggedImages: true,
    },
    props.contentKind === 'person',
  );
  if (props.contentKind === 'person') {
    console.log(taggedImages, images);
  }

  const ImageCard = ({
    type,
    lists,
    isSuccess,
  }: {
    type: 'poster' | 'backdrop' | 'logo' | 'profile' | 'tagged_images';
    lists: {posters: any[]; backdrops: any[]; logos: any[]; profiles: any[]};
    isSuccess: boolean;
  }) => {
    const imageList =
      type === 'poster'
        ? lists?.posters
        : type == 'backdrop'
        ? lists?.backdrops
        : type === 'logo'
        ? lists?.logos
        : type === 'profile'
        ? lists?.profiles
        : lists?.results || [];

    if (imageList?.length === 0) return null;
    return (
      <Skelton
        style={tw.style(
          ` rounded-lg border border-primary`,
          ['poster', 'profile'].includes(type)
            ? 'h-40 w-28'
            : 'h-full w-full flex-1',
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
              ['poster', 'profile'].includes(type) ? 'w-28' : 'w-full',
            )}
            source={{
              uri:
                type === 'poster'
                  ? getPosterImageURL(imageList?.[0]?.file_path, 'w500')
                  : type === 'backdrop'
                  ? getBackdropImageURL(imageList?.[0]?.file_path, 'w780')
                  : type === 'profile'
                  ? getProfileImageURL(imageList?.[0]?.file_path, 'original')
                  : type === 'tagged_images'
                  ? getStillImageURL(imageList?.[0]?.file_path, 'original')
                  : getLogoImageURL(imageList?.[0]?.file_path, 'w300'),
            }}
          />
          <TText
            style={tw`text-white text-center absolute bottom-0 mx-auto w-full bg-black/60 p-2 `}
            color={'white'}>
            {imageList?.length}{' '}
            {type === 'profile'
              ? 'Profiles'
              : type === 'backdrop'
              ? 'Backdrops'
              : type === 'logo'
              ? 'Logos'
              : type === 'poster'
              ? 'Posters'
              : 'Tagged Images'}
          </TText>
        </TouchableOpacity>
      </Skelton>
    );
  };

  return (
    <Section label={'Images'} labelColor="white">
      <TView stack="hStack" style={tw`gap-2`} mX={8}>
        {props.contentKind === 'person' ? (
          <>
            <ImageCard
              lists={images}
              type="profile"
              isSuccess={req.isSuccess}
            />
            <ImageCard
              lists={taggedImages}
              type="tagged_images"
              isSuccess={req.isSuccess}
            />
          </>
        ) : (
          <>
            <ImageCard lists={images} type="poster" isSuccess={req.isSuccess} />
            <ImageCard
              lists={images}
              type="backdrop"
              isSuccess={req.isSuccess}
            />
          </>
        )}
      </TView>
    </Section>
  );
}
