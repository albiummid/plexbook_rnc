import React, {PropsWithChildren} from 'react';
import {Image, ImageProps} from 'react-native';
import tw from '../../lib/tailwind';
import TView from './TView';

export default function TImage(props: PropsWithChildren<ImageProps>) {
  return (
    <TView style={tw`h-full w-full`}>
      <Image style={[tw`h-full w-full`, props.style]} {...props} />
    </TView>
  );
}
