import moment from 'moment';
import React, {PropsWithChildren} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../../lib/tailwind';
import {getImageURL} from '../../../lib/tmdb';
import {router} from '../../../navigation/navigator';
import {routes} from '../../../navigation/Screens';
import {TMovieListItem} from '../../../types/contents/movie.types';
import Icons from '../../ui/vector-icons';

type CardProps = PropsWithChildren<
  {
    data: TMovieListItem;
    style?: ViewStyle;
    disable?: boolean;
  } & ViewProps
>;

export default function MovieCard({data, style, disable}: CardProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!disable) {
          router.push(routes.movie_details, {
            id: data.id,
            data,
          });
        }
      }}
      activeOpacity={0.5}
      style={[tw`h-40 w-28 rounded-lg`, style]}>
      <Image
        style={tw`h-full w-full rounded-lg`}
        source={{uri: getImageURL(data.poster_path)}}
      />
      <LinearGradient
        style={tw`absolute bottom-0 w-full rounded-b-lg flex-row items-center justify-between p-2`}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['transparent', 'black']}>
        <Text style={tw`text-white  text-xs font-semibold`}>
          {moment(data.release_date).format('YYYY')}
          {/* {data.release_date.split('-')[0]} */}
        </Text>
        <View style={tw`flex-row items-center gap-1`}>
          <Icons.AntDesign name="star" size={15} style={tw`text-primary`} />
          <Text style={tw`  text-primary font-bold text-xs`}>
            {Number(data.vote_average).toFixed(1)}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export const CollectionMovieCard = (
  props: CardProps & {index: number; disable: boolean},
) => {
  return (
    <LinearGradient
      colors={['transparent', 'black']}
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0.5}}
      key={props.index}
      style={[tw``, props.style]}>
      <MovieCard data={props.data} disable={props.disable} />
      <Text
        style={tw`text-9xl text-gray-50 font-bold absolute opacity-40 right-0`}>
        {props.index + 1}
      </Text>
    </LinearGradient>
  );
};