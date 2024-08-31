import React from 'react';
import {ColorValue, View} from 'react-native';
import tw from '../../libs/tailwind';
import {TViewProps} from '../../types/ui.types';

export default function TDivider(
  props: TViewProps<{
    horizontal?: boolean;
    vertical?: boolean;
    gap?: number;
    color?: ColorValue;
  }>,
) {
  return (
    <View
      style={[
        tw.style(
          `bg-gray-200 rounded-lg ${
            props.gap
              ? props.vertical
                ? `my-[${props.gap}]`
                : `mx-[${props.gap}]`
              : ''
          }`,
          props.horizontal && 'border-l',
          props.vertical && `border-b  `,
          props.color && `bg-[${String(props.color)}]`,
        ),
        props.style,
      ]}
    />
  );
}
