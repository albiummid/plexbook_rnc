import React, {PropsWithChildren} from 'react';
import {ScrollView, ScrollViewProps, View} from 'react-native';
import tw from '../../lib/tailwind';

export default function TScrollView(props: PropsWithChildren<ScrollViewProps>) {
  return (
    <ScrollView
      style={props.style}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {props.children}
      <View style={[tw`${props.horizontal ? 'ml-5' : 'mb-5'}`]} />
    </ScrollView>
  );
}
