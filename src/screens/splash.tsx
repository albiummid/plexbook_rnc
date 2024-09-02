import React, {useEffect} from 'react';
import {Image, ImageBackground} from 'react-native';
import {useFirebaseAuth} from '../libs/firebase';
import tw from '../libs/tailwind';
import {getMS, wait} from '../libs/utils/helpers';
import {router} from '../navigation/navigator';

export default function SplashScreen() {
  const {isAuthenticated, isLoading} = useFirebaseAuth();

  console.log(isAuthenticated);
  useEffect(() => {
    if (!isLoading) {
      wait(getMS.second(100)).then(() => {
        if (isAuthenticated) {
          router.replace('tab_root');
        } else {
          router.replace('onboarding');
        }
      });
    }
  }, [isAuthenticated, isLoading]);

  return (
    <ImageBackground
      source={require('../assets/images/movie-bg.png')}
      style={tw`flex-1 bg-black justify-center items-center`}>
      <Image
        style={tw`h-60 w-60`}
        source={require('../assets/images/logo.png')}
      />
    </ImageBackground>
  );
}
