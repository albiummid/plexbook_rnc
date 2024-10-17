import React from 'react';
import {Text} from 'react-native';
import tw from '../../libs/tailwind';
import {TTextProps} from '../../types/ui.types';

export default function TText(props: TTextProps) {
  const utils = {
    gap: props.gap && `gap-[${props.gap}]`,
    gapX: props.gapX && `gap-x-[${props.gapX}]`,
    gapY: props.gapY && `gap-y-[${props.gapY}]`,
    stack:
      props.stack === 'hStack'
        ? 'flex-row'
        : props.stack === 'vStack' && 'flex-col',
    justifyContent: props.justifyContent && ` justify-${props.justifyContent}`,
    alignItems: props.alignItems && `items-${props.alignItems}`,
    mT: props.mT && `mt-[${props.mT}]`,
    mB: props.mB && `mb-[${props.mB}]`,
    mL: props.mL && `ml-[${props.mL}]`,
    mR: props.mR && `mr-[${props.mR}]`,
    mX: props.mX && `mx-[${props.mX}]`,
    mY: props.mY && `my-[${props.mY}]`,
    m: props.m && `m-[${props.m}]`,
    color: props.color && `text-${String(props.color)}`,
  };

  const utilStyles = tw.style(
    Object.values(utils).filter(Boolean).join(' ').trim(),
  );
  return (
    <Text style={[utilStyles, tw`text-white`, props.style]} {...props}>
      {props.children}
    </Text>
  );
}
