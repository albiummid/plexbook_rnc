import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import React, {PropsWithChildren} from 'react';
import {FlatList} from 'react-native';
import tw from '../lib/tailwind';
import {getContentCollection} from '../lib/tmdb';
import {TMovieCollection, TMovieListItem} from '../types/contents/movie.types';
import {renderHorizontalSkeltonList} from './content/card/content-skelton';
import {CollectionMovieCard} from './content/card/movie-card';
import Section from './Section';

export default function CollectionList({
  collectionId,
  id,
}: PropsWithChildren<{collectionId: number; id: number}>) {
  const {data: collection, ...collectionReq} = useQuery({
    queryKey: ['movie-collection', collectionId],
    queryFn: async () => {
      const {data} = await getContentCollection(collectionId);
      return data as TMovieCollection;
    },
  });

  return (
    <Section label={collection?.name ?? 'Collection'} labelColor="white">
      {!collection ? (
        renderHorizontalSkeltonList()
      ) : (
        <FlatList
          horizontal
          data={collection?.parts.sort((a, b) =>
            moment(a.release_date).diff(b.release_date),
          )}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <CollectionMovieCard
                disable={id === item.id}
                style={tw`mx-2 border-primary rounded-lg ${
                  id === item.id ? 'border' : ''
                }`}
                data={item as TMovieListItem}
                index={index}
              />
            );
          }}
        />
      )}
    </Section>
  );
}
