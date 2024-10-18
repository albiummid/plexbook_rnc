import {useQuery} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import tw from '../libs/tailwind';
import {
  getContentCastListById,
  getPosterImageURL,
  usePersonContentCredit,
} from '../libs/tmdb';
import {MovieCastList} from '../types/contents/movie.types';
import CastCard from './content/card/cast-card';
import {renderHorizontalSkeltonList} from './content/card/content-skelton';
import Section from './Section';
import {
  TMovieCastCredit,
  TPersonMovieCredit,
  TPersonTVCredit,
  TSeriesCastCredit,
} from '../types/contents/person.types';
import {FlashList} from '@shopify/flash-list';
import TImage from './ui/TImage';
import TText from './ui/TText';
import {router} from '../libs/navigation/navigator';

export default function ArtistList({
  id,
  contentKind,
}: PropsWithChildren<{id: number; contentKind: 'movie' | 'tv'}>) {
  const {data: listRes, ...listReq} = useQuery({
    queryKey: ['cast-list', id],
    queryFn: async () => {
      const {data} = await getContentCastListById(contentKind, id);
      return data;
    },
  });
  const mainActor = listRes?.cast?.[0];

  const {data: credits, ...creditReq} = usePersonContentCredit(
    contentKind,
    mainActor?.id,
  );

  return (
    <>
      <Section labelColor={'white'} label="Artists">
        {listReq.isLoading ? (
          renderHorizontalSkeltonList()
        ) : (
          <FlatList
            horizontal
            data={listRes.cast}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return <CastCard style={tw`ml-2`} {...(item as any)} />;
            }}
          />
        )}
      </Section>
      {/* Main actor credit list */}
      <Section
        label={`More ${contentKind === 'movie' ? 'movies' : 'series'} from ${
          mainActor?.name
        }`}>
        <FlatList
          horizontal
          data={credits?.cast}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                router.push(
                  contentKind === 'movie' ? 'movie_details' : 'series_details',
                  {id: item.id},
                );
              }}
              style={tw`mr-2 w-24 `}>
              <TImage
                source={{uri: getPosterImageURL(item?.poster_path, 'w185')}}
                style={tw`h-40 w-full rounded-lg mx-auto`}
              />
              <TText
                numberOfLines={1}
                style={tw`text-xs text-center text-white  mt-1`}>
                {item?.character}
              </TText>
              <TText
                numberOfLines={1}
                style={tw` font-bold text-center text-white `}>
                {contentKind === 'movie' ? item.title : item.name}
              </TText>
            </TouchableOpacity>
          )}
        />
      </Section>
    </>
  );
}
