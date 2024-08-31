import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useFirebaseAuth} from '../libs/firebase';
import tw from '../libs/tailwind';
import {router} from '../navigation/navigator';

export default function SplashScreen() {
  const {isAuthenticated, isLoading} = useFirebaseAuth();
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace('tab_root');
    }
  }, [isAuthenticated, isLoading]);
  return (
    <View style={tw`flex-1 bg-black`}>
      <Text>SplashScreen</Text>
    </View>
  );
}
