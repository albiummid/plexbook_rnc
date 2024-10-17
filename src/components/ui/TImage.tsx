import React, {PropsWithChildren, useState} from 'react';
import {Image, ImageProps} from 'react-native';
import Skelton from './Skelton';

export default function TImage(props: PropsWithChildren<ImageProps>) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <Skelton
        shimmerColors={['black', 'gray', 'black']}
        shimmerStyle={[props.style]}
        visible={!isLoading}>
        <Image
          onLoadEnd={() => {
            setIsLoading(false);
          }}
          style={[props.style]}
          {...props}
        />
      </Skelton>
    </>
  );
}
