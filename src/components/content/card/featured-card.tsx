import React, {PropsWithChildren} from 'react';
import {Image, Pressable, ViewProps} from 'react-native';
import tw from '../../../lib/tailwind';
import {getImageURL} from '../../../lib/tmdb';
import {router} from '../../../navigation/navigator';
import {routes} from '../../../navigation/Screens';
import {TMovieListItem} from '../../../types/contents/movie.types';

export function FeaturedMovieCard(
  props: PropsWithChildren<ViewProps & {data: TMovieListItem}>,
) {
  return (
    <Pressable
      onPress={() => {
        router.navigate(routes.movie_details, {
          id: props.data.id,
          data: props.data,
        });
      }}
      style={[tw`w-full h-full`, props.style]}>
      <Image
        style={tw` h-full w-full rounded-lg`}
        source={{uri: getImageURL(props.data.poster_path)}}
      />
    </Pressable>
  );
}
