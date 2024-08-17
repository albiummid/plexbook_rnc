import React, {PropsWithChildren} from 'react';
import {Text, View} from 'react-native';
import tw from '../../../lib/tailwind';

type CardProps = PropsWithChildren<{
  data: TMovieListItem;
  style?: ViewStyle;
}>;

export default function SeriesCard({data, style}: CardProps) {
  return (
    <View style={[tw`h-40 bg-red-400`, style]}>
      <Text>ContentCard</Text>
    </View>
  );
}
