import React from 'react';
import {ColorValue, StyleProp, TextStyle, ViewStyle} from 'react-native';
import tw from '../../../lib/tailwind';
import Skelton from '../../ui/Skelton';
import TText from '../../ui/TText';
import TView from '../../ui/TView';

export default function InfoCard(props: {
  label: string;
  value?: string | number | undefined;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  textColor?: ColorValue;
  isLoading?: boolean;
}) {
  const utilClasses = {
    basic: `  ${props?.textColor ? `text-[${String(props.textColor)}]` : ''}`,
  };
  return (
    <TView
      //   justifyContent="between"
      alignItems="center"
      stack="hStack"
      style={[tw` justify-between`, props.style]}>
      <>
        {props.isLoading ? (
          <>
            <Skelton style={tw` h-6 w-1/4 rounded-sm  `} />
            <Skelton style={tw` h-6 w-2/4 rounded-sm  `} />
          </>
        ) : (
          <>
            <TText
              style={[
                tw.style(utilClasses.basic, 'font-bold text-base'),
                props.labelStyle,
              ]}>
              {props.label}
            </TText>
            <TText
              style={[
                tw.style(utilClasses.basic, ' ml-auto max-w-1/2'),
                props.valueStyle,
              ]}>
              {typeof props.value === 'number'
                ? props.value > 0
                  ? props.value
                  : 'N/A'
                : props.value ?? 'N/A'}
            </TText>
          </>
        )}
      </>
    </TView>
  );
}

// {typeof props.value === 'string' ||
//     (typeof props.value === 'number' ? (
//       <TText
//         style={[tw.style(utilClasses.basic, 'flex-1'), props.valueStyle]}>
//         {typeof props.value === 'number'
//           ? props.value > 0
//             ? props.value
//             : 'N/A'
//           : props.value ?? 'N/A'}
//       </TText>
//     ) : (
//       <>{props.value}</>
//     ))}
