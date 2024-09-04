import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import TText from '../components/ui/TText';
import TView from '../components/ui/TView';
import {useFirebaseAuth} from '../libs/firebase';
import {router} from '../libs/navigation/navigator';
import tw from '../libs/tailwind';
import {getMS, wait} from '../libs/utils/helpers';

export default function SplashScreen() {
  const {isAuthenticated, isLoading} = useFirebaseAuth();
  const [spinning, setSpinning] = useState(true);
  const scale = useSharedValue(1);

  const scaleDown = () => {
    return withTiming(0.5, {
      duration: 1000,
    });
  };

  useEffect(() => {
    scale.value = withDelay(500, withRepeat(scaleDown(), 4, true));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      wait(getMS.second(4.5)).then(() => {
        if (isAuthenticated) {
          router.replace('tab_root');
        } else {
          router.replace('onboarding');
        }
      });
    }
  }, [isAuthenticated, isLoading, spinning]);

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
        />
      </Animated.View>
      <TView>
        <TText style={tw`text-white mt-auto mx-auto`}>
          Made with ❤️ by Albi Ummid
        </TText>
        <TText style={tw`text-white text-xs mt-auto mx-auto`}>
          albiummid@gmail.com
        </TText>
      </TView>
    </TView>
  );
}
