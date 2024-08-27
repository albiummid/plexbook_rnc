import {FlashList} from '@shopify/flash-list';
import React, {PropsWithChildren, useState} from 'react';
import {Image, ImageBackground, Modal, TouchableOpacity} from 'react-native';
import tw from '../lib/tailwind';
import {getImageURL, useContentImages} from '../lib/tmdb';
import {Poster} from '../types/contents/content.types';
import Section from './Section';
import Skelton from './ui/Skelton';
import TText from './ui/TText';
import TView from './ui/TView';
import Icons from './ui/vector-icons';

export default function ContentImageList(
  props: PropsWithChildren<{id: number; contentKind: 'movie' | 'tv'}>,
) {
  const [list, setList] = useState<any[]>([]);
  const [active, setActive] = useState('');

  const {data: images, ...req} = useContentImages(props.id, props.contentKind);

  return (
    <Section label={'Images'} labelColor="white">
      <TView stack="hStack" style={tw`gap-2`} mX={8}>
        <Skelton
          style={tw`h-40 w-28 rounded-lg border border-primary`}
          visible={req.isSuccess}>
          <TouchableOpacity
            onPress={() => {
              setList(images!.posters);
              setActive('posters');
            }}
            style={tw``}>
            <Image
              blurRadius={2}
              style={tw`h-40 w-28 rounded-lg`}
              source={{
                uri: getImageURL(images?.posters[0].file_path),
              }}
            />
            <TText
              style={tw`text-white text-center absolute bottom-0 mx-auto w-full bg-black/60 p-2 `}
              color={'white'}>
              {images?.posters.length} Poster
            </TText>
          </TouchableOpacity>
        </Skelton>

        {/*  */}

        <Skelton
          style={tw`h-full w-full flex-1 rounded-lg border border-primary`}
          visible={req.isSuccess}>
          <TouchableOpacity
            onPress={() => {
              setList(images!.backdrops);
              setActive('backdrops');
            }}
            style={tw` h-full w-full flex-1`}>
            <ImageBackground
              blurRadius={2}
              style={tw`h-40 w-full rounded-lg`}
              source={{
                uri: getImageURL(images?.backdrops[0].file_path),
              }}>
              <TText
                style={tw`text-white text-center mt-auto mx-auto w-full bg-black/60 p-2 `}
                color={'white'}>
                {images?.backdrops.length} Backdrops
              </TText>
            </ImageBackground>
          </TouchableOpacity>
        </Skelton>
      </TView>
      <Modal
        transparent
        animationType="fade"
        visible={list?.length > 0}
        onDismiss={() => {
          setList([]);
        }}>
        <TView style={tw`bg-black/80 flex-1`}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tw`ml-auto p-1`}
            onPress={() => {
              setList([]);
            }}>
            <Icons.AntDesign
              name="close"
              size={25}
              style={tw`bg-primary mr-auto rounded-full p-1`}
            />
          </TouchableOpacity>

          <FlashList
            estimatedItemSize={40}
            data={list}
            numColumns={active === 'backdrops' ? 1 : 2}
            renderItem={({item}: {item: Poster}) => {
              return (
                <TView
                  style={tw.style(
                    ` m-2 rounded-lg   border border-primary `,
                    active === 'backdrops'
                      ? `h-60  flex-1`
                      : `h-80 w-full flex-1`,
                  )}>
                  <Image
                    style={tw`w-full h-full rounded-lg`}
                    source={{uri: getImageURL(item.file_path)}}
                  />
                  <TView
                    style={tw`bg-black/60 w-full p-2 rounded-t-lg absolute top-0`}
                    stack="hStack"
                    justifyContent="between">
                    <TView stack="hStack" gap={1} alignItems="center">
                      <Icons.AntDesign
                        style={tw`text-primary`}
                        name="star"
                        size={15}
                      />
                      <TText style={tw`text-white text-base`}>
                        {Number(item.vote_average).toFixed(1)}
                      </TText>
                    </TView>
                    <TView stack="hStack" gap={1} alignItems="center">
                      <Icons.AntDesign
                        style={tw`text-primary`}
                        name="like2"
                        size={15}
                      />
                      <TText style={tw`text-white text-base`}>
                        {item.vote_count}
                      </TText>
                    </TView>
                  </TView>
                </TView>
              );
            }}
          />
        </TView>
      </Modal>
    </Section>
  );
}
