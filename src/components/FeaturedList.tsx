import {useQuery} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import tw from '../lib/tailwind';
import {getTrending} from '../lib/tmdb';
import {screenWidth} from '../lib/utils/Scaling';
import {getMS} from '../lib/utils/helpers';
import {TMovieListItem} from '../types/contents/movie.types';
import {TSeriesListItem} from '../types/contents/series.types';
import Section from './Section';
import {
  FeaturedMovieCard,
  FeaturedSeriesCard,
} from './content/card/featured-card';
import Skelton from './ui/Skelton';

export function FeaturedMovieList(
  props: PropsWithChildren<{contentKind: 'movie' | 'tv'}>,
) {
  const {data: trendingRes, ...trendingReq} = useQuery({
    queryKey: [`${props.contentKind}-featured`],
    queryFn: async () => {
      const {data} = await getTrending(props.contentKind, 'week');
      return data;
    },
  });

  return (
    <Section label={'Featured'}>
      {trendingReq.isSuccess ? (
        <Carousel
          width={screenWidth}
          style={tw`h-84 flex-1`}
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
          renderItem={({item}) => {
            return (
              <>
                {props.contentKind === 'movie' ? (
                  <FeaturedMovieCard
                    style={tw`mx-auto h-88 w-64 rounded-lg`}
                    data={item as TMovieListItem}
                  />
                ) : (
                  <FeaturedSeriesCard
                    style={tw`mx-auto h-88 w-64 rounded-lg`}
                    data={item as TSeriesListItem}
                  />
                )}
              </>
            );
          }}
        />
      ) : (
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
          data={[...Array(5).keys()]}
          renderItem={({item}) => {
            return (
              <Skelton
                isReversed
                // shimmerColors={['#f9fafb']}
                style={tw`mx-auto h-88 w-64 rounded-lg border border-gray-50`}
              />
            );
          }}
        />
      )}
    </Section>
  );
}
