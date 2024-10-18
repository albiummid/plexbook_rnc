import React, {PropsWithChildren} from 'react';
import {Image, StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {router} from '../../../libs/navigation/navigator';
import tw from '../../../libs/tailwind';
import {getProfileImageURL} from '../../../libs/tmdb';
import {Cast} from '../../../types/contents/movie.types';
import TText from '../../ui/TText';
import TView from '../../ui/TView';

export default function CastCard(
  props: PropsWithChildren<Cast & {style?: StyleProp<ViewStyle>}>,
) {
  let imageURL = Image.resolveAssetSource(
    require('../../../assets/images/avatar.webp'),
  ).uri;
  if (props.profile_path) {
    imageURL = getProfileImageURL(props.profile_path!, 'w342');
  }

  return (
    <TouchableOpacity
      style={[tw`w-24`, props.style]}
      activeOpacity={0.5}
      onPress={() => {
        router.navigate('person_details', {id: props.id});
      }}>
      <TView style={tw`h-32 w-24 mx-auto mb-2`}>
        <Image style={tw`h-full w-full rounded-3xl`} source={{uri: imageURL}} />
      </TView>
      <TText numberOfLines={1} style={tw` text-white text-xs text-center`}>
        {props.character}
      </TText>
      <TText numberOfLines={1} style={tw` text-white text-center font-bold`}>
        {props.name}
      </TText>
    </TouchableOpacity>
  );
}
