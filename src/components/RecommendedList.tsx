import React, {PropsWithChildren} from 'react';
import {FlatList, ViewProps} from 'react-native';
import tw from '../libs/tailwind';
import {useContentRecommendation} from '../libs/tmdb';
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

  if (data?.results?.length === 0) {
    return null;
  }

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
              <MovieCard
                contentId={item.id}
                style={tw`mr-2 w-24`}
                data={item}
              />
            ) : (
              <SeriesCard
                contentId={item.id}
                style={tw`mr-2 w-24`}
                data={item}
              />
            )
          }
        />
      )}
    </Section>
  );
}
