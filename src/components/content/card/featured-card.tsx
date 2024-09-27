import React, {PropsWithChildren} from 'react';
import {Image, Pressable, ViewProps} from 'react-native';
import {router} from '../../../libs/navigation/navigator';
import tw from '../../../libs/tailwind';
import {getPosterImageURL} from '../../../libs/tmdb';
import {TMovieListItem} from '../../../types/contents/movie.types';
import {TSeriesListItem} from '../../../types/contents/series.types';

export function FeaturedMovieCard(
  props: PropsWithChildren<ViewProps & {data: TMovieListItem}>,
) {
  return (
    <Pressable
      onPress={() => {
        router.navigate('movie_details', {
          id: props.data.id,
          data: props.data,
        });
      }}
      style={[tw`w-full h-full`, props.style]}>
      <Image
        style={tw` h-full w-full rounded-lg`}
        source={{uri: getPosterImageURL(props.data.poster_path, 'w500')}}
      />
    </Pressable>
  );
}

export function FeaturedSeriesCard(
  props: PropsWithChildren<ViewProps & {data: TSeriesListItem}>,
) {
  return (
    <Pressable
      onPress={() => {
        router.navigate('series_details', {
          id: props.data.id,
          data: props.data,
        });
      }}
      style={[tw`w-full h-full`, props.style]}>
      <Image
        style={tw` h-full w-full rounded-lg`}
        source={{uri: getPosterImageURL(props.data.poster_path, 'w500')}}
      />
    </Pressable>
  );
}
