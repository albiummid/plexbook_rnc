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
import {router} from '../../../libs/navigation/navigator';
import tw from '../../../libs/tailwind';
import {getImageURL} from '../../../libs/tmdb';
import {Season, TSeriesListItem} from '../../../types/contents/series.types';
import TImage from '../../ui/TImage';
import TText from '../../ui/TText';
import Icons from '../../ui/vector-icons';

type CardProps = PropsWithChildren<
  {
    data: TSeriesListItem;
    style?: ViewStyle;
    disable?: boolean;
  } & ViewProps
>;

export default function SeriesCard({data, style, disable}: CardProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!disable) {
          router.push('series_details', {
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
          {moment(data.first_air_date).format('YYYY')}
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

export const CollectionSeriesCard = (
  props: CardProps & {index: number; disable: boolean},
) => {
  return (
    <LinearGradient
      colors={['transparent', 'black']}
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0.5}}
      key={props.index}
      style={[tw``, props.style]}>
      <SeriesCard data={props.data} disable={props.disable} />
      <Text
        style={tw`text-9xl text-gray-50 font-bold absolute opacity-40 right-0`}>
        {props.index + 1}
      </Text>
    </LinearGradient>
  );
};

export const SeasonCard = (props: Season & {seriesId: number}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push('season_details', {data: props, id: props.seriesId});
      }}
      style={tw`  ml-2 mr-2 gap-2`}>
      <TImage
        style={tw`w-26 h-40 rounded-lg`}
        source={{uri: getImageURL(props.poster_path)}}
      />
      <TText style={tw`text-white text-center font-bold`}>
        {props.name} (E:{props.episode_count})
      </TText>
    </TouchableOpacity>
  );
};
