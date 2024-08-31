import React, {PropsWithChildren} from 'react';
import {FlatList} from 'react-native';
import {ShimmerPlaceholderProps} from 'react-native-shimmer-placeholder';
import tw from '../../../libs/tailwind';
import Skelton from '../../ui/Skelton';

export default function ContentSkelton({
  children,
  ...props
}: PropsWithChildren<ShimmerPlaceholderProps>) {
  return (
    <Skelton
      {...props}
      style={[tw`h-40 w-28 rounded-lg bg-primary`, props.style]}>
      {children}
    </Skelton>
  );
}

export const renderHorizontalSkeltonList = () => {
  const items = [...Array(4).keys()];
  return (
    <FlatList
      horizontal
      data={items}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
        return (
          <ContentSkelton
            delay={index * 1000}
            duration={1000}
            style={tw`mx-2`}
          />
        );
      }}
    />
  );
};
