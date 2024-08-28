import React, {PropsWithChildren} from 'react';
import {Image, ImageProps} from 'react-native';
import tw from '../../lib/tailwind';

export default function TImage(props: PropsWithChildren<ImageProps>) {
  return <Image style={[tw`h-full w-full`, props.style]} {...props} />;
}
