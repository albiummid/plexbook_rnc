import React, {useEffect} from 'react';
import {Image} from 'react-native';
import TText from '../components/ui/TText';
import TView from '../components/ui/TView';
import {useFirebaseAuth} from '../libs/firebase';
import tw from '../libs/tailwind';
import {getMS, wait} from '../libs/utils/helpers';
import {router} from '../navigation/navigator';

export default function SplashScreen() {
  const {isAuthenticated, isLoading} = useFirebaseAuth();

  console.log(isAuthenticated);
  useEffect(() => {
    if (!isLoading) {
      wait(getMS.second(4)).then(() => {
        if (isAuthenticated) {
          router.replace('tab_root');
        } else {
          router.replace('onboarding');
        }
      });
    }
  }, [isAuthenticated, isLoading]);

  return (
    <TView
      // source={require('../assets/images/movie-bg.png')}
      style={tw`flex-1 bg-black  `}>
      <TView style={tw`justify-center flex-1 items-center`}>
        <Image
          style={tw`h-60 w-60`}
          source={require('../assets/images/logo.png')}
        />
      </TView>
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
