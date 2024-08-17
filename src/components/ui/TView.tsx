import React from 'react';
import {View, ViewProps} from 'react-native';
import tw from '../../lib/tailwind';
import {TComponentProps} from '../../types/ui.types';

export default function TView(props: TComponentProps<ViewProps>) {
  const {
    children,
    stack,
    style,
    gap,
    gapX,
    gapY,
    justifyContent,
    alignItems,
    ...rest
  } = props;
  const utils = {
    gap: gap && `gap-[${gap}]`,
    gapX: gapX && `gap-x-[${gapX}]`,
    gapY: gapY && `gap-y-[${gapY}]`,
    stack: stack === 'hStack' ? 'flex-row' : stack === 'vStack' && 'flex-col',
    justifyContent: justifyContent && ` justify-${justifyContent}`,
    alignItems: alignItems && `items-${alignItems}`,
    mT: props.mT && `mt-[${props.mT}]`,
    mB: props.mB && `mb-[${props.mB}]`,
    mL: props.mL && `ml-[${props.mL}]`,
    mR: props.mR && `mr-[${props.mR}]`,
    mX: props.mX && `mx-[${props.mX}]`,
    mY: props.mY && `my-[${props.mY}]`,
    m: props.m && `m-[${props.m}]`,
  };

  const classNames = Object.values(utils).filter(Boolean).join(' ').trim();

  return (
    <View style={[tw``, style, tw.style(classNames)]} {...rest}>
      {children}
    </View>
  );
}
