import React, {PropsWithChildren} from 'react';
import {FlatList, ViewProps} from 'react-native';
import tw from '../lib/tailwind';
import {useContentRecommendationList} from '../lib/tmdb';
import {TMovieListItem} from '../types/contents/movie.types';
import {renderHorizontalSkeltonList} from './content/card/content-skelton';
import MovieCard from './content/card/movie-card';
import Section from './Section';

export default function RecommendedList(
  props: PropsWithChildren<
    ViewProps & {
      contentKind: 'movie' | 'tv';
      contentId: number;
    }
  >,
) {
  const {data, ...listReq} = useContentRecommendationList(
    props.contentKind,
    props.contentId,
  );

  return (
    <Section label={`Recommended ${props.contentKind}`} labelColor="white">
      {!listReq.isSuccess && renderHorizontalSkeltonList()}
      {listReq.isSuccess && (
        <FlatList
          horizontal
          data={data?.pages}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            if (props.contentKind === 'movie') {
              return item.data.results.map((x: TMovieListItem, key: number) => (
                <MovieCard style={tw`mx-2`} data={x} key={key} />
              ));
            }
          }}
        />
      )}
    </Section>
  );
}
