import React, {PropsWithChildren} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import tw from '../../libs/tailwind';

type Props = PropsWithChildren<{
  isActive?: boolean;
  textStyle?: StyleProp<TextStyle>;
}> &
  TouchableOpacityProps;
export default function ToggleButton({
  isActive = false,
  children,
  textStyle,
  ...props
}: Props) {
  return (
    <TouchableOpacity {...props}>
      <Text
        style={[
          tw.style(
            `px-2 py-1 mr-auto  rounded-lg`,
            !isActive && `text-primary border border-primary`,
            isActive && `text-black border bg-primary border-primary`,
          ),
          textStyle,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
