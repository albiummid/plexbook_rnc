import React, {PropsWithChildren} from 'react';
import {Image, StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import tw from '../../../lib/tailwind';
import {getImageURL} from '../../../lib/tmdb';
import {router} from '../../../navigation/navigator';
import {routes} from '../../../navigation/Screens';
import {Cast} from '../../../types/contents/movie.types';
import TText from '../../ui/TText';
import TView from '../../ui/TView';

export default function CastCard(
  props: PropsWithChildren<Cast & {style?: StyleProp<ViewStyle>}>,
) {
  return (
    <TouchableOpacity
      style={props.style}
      activeOpacity={0.5}
      onPress={() => {
        router.navigate(routes.person_details, {...props});
      }}>
      <TView style={tw`h-32 w-24 mx-auto`}>
        <Image
          style={tw`h-full w-full rounded-3xl`}
          source={{uri: getImageURL(props.profile_path!)}}
        />
      </TView>
      <TText style={tw` text-white text-xs text-center`}>
        {props.character}
      </TText>
      <TText style={tw` text-white text-center font-bold`}>{props.name}</TText>
    </TouchableOpacity>
  );
}
