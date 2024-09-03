import {useQuery} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';
import {FlatList} from 'react-native';
import tw from '../libs/tailwind';
import {getContentCastListById} from '../libs/tmdb';
import {MovieCastList} from '../types/contents/movie.types';
import CastCard from './content/card/cast-card';
import {renderHorizontalSkeltonList} from './content/card/content-skelton';
import Section from './Section';

export default function ArtistList({
  id,
  contentKind,
}: PropsWithChildren<{id: number; contentKind: 'movie' | 'tv'}>) {
  const {data: listRes, ...listReq} = useQuery({
    queryKey: ['cast-list', id],
    queryFn: () => getContentCastListById(contentKind, id),
  });
  const data: MovieCastList = listRes?.data;

  return (
    <>
      <Section
        labelColor={'white'}
        label="Artists"
        // rightButtonTitle="View All"
        // onRightButtonPress={() => {
        //   router.navigate('cast_list', {
        //     id,
        //   });
        // }}
      >
        {listReq.isLoading ? (
          renderHorizontalSkeltonList()
        ) : (
          <FlatList
            horizontal
            data={data.cast.slice(0, 10)}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return <CastCard style={tw`ml-2`} {...item} />;
            }}
          />
        )}
      </Section>
    </>
  );
}
