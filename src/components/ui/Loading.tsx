import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../constants/colors';
import tw from '../../libs/tailwind';
import TView from './TView';

export function LoadingSpinner() {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(withTiming(1.2, {duration: 400}), -1, true);
  }, []);
  return (
    <TView style={tw`bg-black flex-1 w-full justify-center items-center`}>
      <Animated.Image
        tintColor={colors.primary}
        source={require('../../assets/images/logo.png')}
        style={[tw`w-40 h-40`, {transform: [{scale}]}]}
      />
    </TView>
  );
}
