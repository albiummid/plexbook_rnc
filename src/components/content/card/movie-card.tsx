import moment from 'moment';
import React, {PropsWithChildren} from 'react';
import {Text, TouchableOpacity, View, ViewProps, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {router} from '../../../libs/navigation/navigator';
import tw from '../../../libs/tailwind';
import {getPosterImageURL} from '../../../libs/tmdb';
import {TMovieListItem} from '../../../types/contents/movie.types';
import TImage from '../../ui/TImage';
import Icons from '../../ui/vector-icons';
import TText from '../../ui/TText';

type CardProps = PropsWithChildren<
  {
    contentId: number;
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
          router.push('movie_details', {
            id: data.id,
            data: {poster_path: data.poster_path},
          });
        }
      }}
      activeOpacity={0.5}
      style={[tw`h-40  w-full  rounded-lg`, style]}>
      <TImage
        style={tw`h-full w-full rounded-lg`}
        source={{uri: getPosterImageURL(data.poster_path, 'w154')}}
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
    <TouchableOpacity
      style={[tw`w-26`, props.style]}
      onPress={() => {
        router.push('movie_details', {id: props.data.id});
      }}>
      <MovieCard contentId={props.data.id} data={props.data} disable={true} />
      <TText numberOfLines={1} style={tw`text-center text-white`}>
        {props.data.title}
      </TText>
      <Text
        style={[
          tw`text-9xl text-white/60 bg-black/20 text-right h-full w-full font-bold absolute`,
        ]}>
        {props.index + 1}
      </Text>
    </TouchableOpacity>
  );
};
