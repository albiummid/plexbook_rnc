import React, {PropsWithChildren} from 'react';
import {FlatList, ViewProps} from 'react-native';
import tw from '../lib/tailwind';
import {useContentRecommendation} from '../lib/tmdb';
import {renderHorizontalSkeltonList} from './content/card/content-skelton';
import MovieCard from './content/card/movie-card';
import SeriesCard from './content/card/series-card';
import Section from './Section';

export default function RecommendedList(
  props: PropsWithChildren<
    ViewProps & {
      contentKind: 'movie' | 'tv';
      contentId: number;
    }
  >,
) {
  const {data, ...listReq} = useContentRecommendation(
    props.contentKind,
    props.contentId,
  );

  return (
    <Section label={`Recommendation`} labelColor="white">
      {!listReq.isSuccess && renderHorizontalSkeltonList()}
      {listReq.isSuccess && (
        <FlatList
          horizontal
          data={data?.results}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) =>
            props.contentKind === 'movie' ? (
              <MovieCard style={tw`mx-2`} data={item} />
            ) : (
              <SeriesCard style={tw`mx-2`} data={item} />
            )
          }
        />
      )}
    </Section>
  );
}
