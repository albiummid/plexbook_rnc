import React, {PropsWithChildren} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import tw from '../../libs/tailwind';

export default function TButton({
  children,
  textStyle,
  ...props
}: PropsWithChildren<{textStyle?: StyleProp<TextStyle>}> &
  TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props}>
      <Text
        style={[
          tw`border text-center border-font_light   text-font_light mr-auto px-2 py-1 rounded-lg`,
          textStyle,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
