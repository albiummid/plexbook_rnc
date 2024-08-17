import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FeaturedMovieList} from '../../../components/FeaturedList';
import TopicSection from '../../../components/TopicSection';
import TScrollView from '../../../components/ui/TScrollView';
import {getTrending} from '../../../lib/tmdb';
import {TMovieListResponse} from '../../../types/contents/content.types';
import {TMovieListItem} from '../../../types/contents/movie.types';
export default function MoviesHomeScreen() {
  const {data: trendingRes} = useQuery({
    queryKey: ['movie-trending-list'],
    queryFn: async () => {
      const {data} = await getTrending('movie', 'week');
      return data as TMovieListResponse<TMovieListItem>;
    },
  });

  return (
    <TScrollView>
      <FeaturedMovieList contentKind="movie" />
      <TopicSection
        contentKind="movie"
        topic={{name: 'Top Rated', kind: 'top_rated'}}
      />
      <TopicSection
        contentKind="movie"
        topic={{name: 'Popular', kind: 'popular'}}
      />
    </TScrollView>
  );
}
