import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList, View, ViewStyle} from 'react-native';
import {router} from '../libs/navigation/navigator';
import tw from '../libs/tailwind';
import {
  getPopularContents,
  getTopRatedContents,
  getTrending,
  getUpcomingContents,
} from '../libs/tmdb';
import {fisherYatesShuffle} from '../libs/utils/helpers';
import {TopicKind} from '../types/common';
import {TMovieListResponse} from '../types/contents/content.types';
import {TMovieListItem} from '../types/contents/movie.types';
import {TSeriesListItem} from '../types/contents/series.types';
import {renderHorizontalSkeltonList} from './content/card/content-skelton';
import MovieCard from './content/card/movie-card';
import SeriesCard from './content/card/series-card';
import Section from './Section';

export default function TopicSection({
  topic,
  style,
  contentKind,
}: {
  topic: {
    name: string;
    kind: TopicKind;
  };
  contentKind: 'movie' | 'tv';
  style?: ViewStyle;
}) {
  const {data: list, ...listReq} = useQuery({
    queryKey: ['topic-horizontal', topic, contentKind],
    queryFn: async () => {
      let res;
      if (topic.kind === 'popular') {
        res = await getPopularContents(contentKind);
      } else if (topic.kind === 'top_rated') {
        res = await getTopRatedContents(contentKind);
      } else if (topic.kind === 'trending') {
        res = await getTrending(contentKind, 'week');
      } else if (topic.kind == 'upcoming') {
        res = await getUpcomingContents(contentKind);
      }
      const data = fisherYatesShuffle(
        (res!.data as TMovieListResponse<TMovieListItem>).results,
      );
      return data;
    },
  });

  return (
    <Section
      label={topic.name}
      rightButtonTitle="View All"
      onRightButtonPress={() => {
        router.navigate('topic_list', {
          topicKind: topic.kind,
          contentKind,
        });
      }}>
      <View style={tw.style('mt-5 gap-2', style)}>
        {!listReq.isSuccess && renderHorizontalSkeltonList()}
        {listReq.isSuccess && (
          <FlatList
            // estimatedItemSize={20}
            disableIntervalMomentum
            horizontal
            data={list}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              if (contentKind == 'movie') {
                return (
                  <MovieCard
                    contentId={item.id}
                    style={tw`w-24 mr-3`}
                    data={item as TMovieListItem}
                  />
                );
              } else {
                return (
                  <SeriesCard
                    style={tw`mr-3 w-24`}
                    contentId={item.id}
                    data={item as TSeriesListItem}
                  />
                );
              }
            }}
          />
        )}
      </View>
    </Section>
  );
}
