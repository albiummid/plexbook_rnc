import React, {forwardRef, PropsWithChildren} from 'react';
import {ScrollView, ScrollViewProps, View} from 'react-native';
import tw from '../../libs/tailwind';

export default forwardRef(function TScrollView(
  props: PropsWithChildren<ScrollViewProps>,
  ref,
) {
  return (
    <ScrollView
      ref={ref}
      style={props.style}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}>
      {props.children}
      <View style={[tw`${props.horizontal ? 'ml-5' : 'mb-5'}`]} />
    </ScrollView>
  );
});
