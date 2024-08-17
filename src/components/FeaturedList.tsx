import {useQuery} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import tw from '../lib/tailwind';
import {getTrending} from '../lib/tmdb';
import {screenWidth} from '../lib/utils/Scaling';
import {getMS} from '../lib/utils/helpers';
import {TMovieListResponse} from '../types/contents/content.types';
import {TMovieListItem} from '../types/contents/movie.types';
import Section from './Section';
import {renderHorizontalSkeltonList} from './content/card/content-skelton';
import {FeaturedMovieCard} from './content/card/featured-card';

export function FeaturedMovieList(
  props: PropsWithChildren<{contentKind: 'movie' | 'tv'}>,
) {
  const {data: trendingRes, ...trendingReq} = useQuery({
    queryKey: ['movie-trending-list'],
    queryFn: async () => {
      const {data} = await getTrending(props.contentKind, 'week');
      return data as TMovieListResponse<TMovieListItem>;
    },
  });

  return (
    <Section label="Featured movies">
      {trendingReq.isLoading && renderHorizontalSkeltonList()}
      <Carousel
        width={screenWidth}
        style={tw`h-84`}
        loop
        autoPlay={true}
        autoPlayInterval={getMS.second(3)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 210,
          parallaxAdjacentItemScale: 0.7,
        }}
        data={trendingRes?.results ?? []}
        renderItem={({item}: {item: TMovieListItem}) => {
          return (
            <FeaturedMovieCard
              style={tw`mx-auto h-88 w-64 rounded-lg`}
              data={item}
            />
          );
        }}
      />
    </Section>
  );
}
