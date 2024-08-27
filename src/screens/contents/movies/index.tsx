import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useRef} from 'react';
import {ScrollView} from 'react-native';
import {FeaturedMovieList} from '../../../components/FeaturedList';
import TopicSection from '../../../components/TopicSection';
import {getTrending} from '../../../lib/tmdb';
import {TMovieListResponse} from '../../../types/contents/content.types';
import {TMovieListItem} from '../../../types/contents/movie.types';
export default function MoviesHomeScreen() {
  const {
    data: trendingRes,
    refetch,
    ...trendingReq
  } = useQuery({
    queryKey: ['movie-trending-list'],
    queryFn: async () => {
      const {data} = await getTrending('movie', 'week');
      return data as TMovieListResponse<TMovieListItem>;
    },
  });

  const scrollViewRef = useRef(null);
  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({y: 0});
    }, []),
  );

  return (
    <ScrollView ref={scrollViewRef}>
      <FeaturedMovieList contentKind="movie" />
      <TopicSection
        contentKind="movie"
        topic={{name: 'Top Rated', kind: 'top_rated'}}
      />
      <TopicSection
        contentKind="movie"
        topic={{name: 'Popular', kind: 'popular'}}
      />
    </ScrollView>
  );
}
