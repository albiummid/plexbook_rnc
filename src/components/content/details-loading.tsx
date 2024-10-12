import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../constants/colors';
import tw from '../../libs/tailwind';
import TView from '../ui/TView';

export default function DetailsLoading() {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(withTiming(1.2, {duration: 500}), -1, true);
  }, []);

  return (
    <TView style={tw`flex-1 w-full  justify-center items-center bg-black`}>
      <Animated.Image
        tintColor={colors.primary}
        source={require('../../assets/images/logo.png')}
        style={[tw`w-40 h-40 rounded-full`, {transform: [{scale}]}]}
      />
    </TView>
  );
}
