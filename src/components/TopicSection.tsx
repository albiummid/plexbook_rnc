import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import tw from '../libs/tailwind';
import {
  getPopularContents,
  getTopRatedContents,
  getTrending,
  getUpcomingContents,
} from '../libs/tmdb';
import {fisherYatesShuffle} from '../libs/utils/helpers';
import {router} from '../navigation/navigator';
import {TopicKind} from '../types/common';
import {TMovieListResponse} from '../types/contents/content.types';
import {TMovieListItem} from '../types/contents/movie.types';
import {TSeriesListItem} from '../types/contents/series.types';
import {renderHorizontalSkeltonList} from './content/card/content-skelton';
import MovieCard from './content/card/movie-card';
import SeriesCard from './content/card/series-card';

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
    <View style={tw.style('mt-5 gap-2', style)}>
      <View style={tw.style(`flex-row items-center justify-between mx-2`)}>
        <Text style={tw`border-l-8 pl-4 border-primary text-lg`}>
          {topic.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.navigate('topic_list', {
              topicKind: topic.kind,
              contentKind,
            });
          }}
          activeOpacity={0.5}>
          <Text
            style={tw` border border-orange-400 text-primary bg-orange-50 px-3 py-1 rounded-lg `}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      {!listReq.isSuccess && renderHorizontalSkeltonList()}
      {listReq.isSuccess && (
        <FlatList
          // estimatedItemSize={20}
          horizontal
          data={list}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            if (contentKind == 'movie') {
              return (
                <MovieCard style={tw`mx-2`} data={item as TMovieListItem} />
              );
            } else {
              return (
                <SeriesCard style={tw`mx-2`} data={item as TSeriesListItem} />
              );
            }
          }}
        />
      )}
    </View>
  );
}
