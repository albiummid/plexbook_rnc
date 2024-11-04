import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import TText from '../components/ui/TText';
import TView from '../components/ui/TView';
import {colors} from '../constants/colors';
import {useDynamicLinks, useFirebaseAuth} from '../libs/firebase';
import {router} from '../libs/navigation/navigator';
import tw from '../libs/tailwind';
import {getMS, wait} from '../libs/utils/helpers';
import {useAuthState} from '../libs/zustand';

export default function SplashScreen() {
  const {isAuthenticated, isLoading, hasDeepLink} = useAuthState();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      500,
      withRepeat(
        withTiming(1.2, {
          duration: 500,
        }),
        4,
        true,
      ),
    );
  }, []);

  useEffect(() => {
    if (hasDeepLink || isLoading) return;
    wait(getMS.second(3)).then(() => {
      router.replace(isAuthenticated ? 'tab_root' : 'onboarding');
    });
  }, [hasDeepLink, isAuthenticated, isLoading]);

  return (
    <TView style={tw`flex-1 bg-black  `}>
      <Animated.View style={tw`justify-center flex-1 items-center`}>
        <Animated.Image
          style={[
            tw`h-60 w-60`,
            {
              transform: [
                {
                  scale,
                },
              ],
            },
          ]}
          source={require('../assets/images/logo.png')}
          tintColor={colors.primary}
        />
      </Animated.View>
      <TView style={tw`mb-10`}>
        <TText style={tw`text-white mt-auto mx-auto`}>
          Made with ❤️ by Albi Ummid
        </TText>
        <TText style={tw`text-white text-xs mt-auto mx-auto`}>
          albi.netlify.app
        </TText>
      </TView>
    </TView>
  );
}
