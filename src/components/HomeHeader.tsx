import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useFirebaseAuth} from '../libs/firebase';
import {router} from '../libs/navigation/navigator';
import tw from '../libs/tailwind';
import TText from './ui/TText';

export default function HomeHeader() {
  const {user} = useFirebaseAuth();
  if (!user) return;

  return (
    <View style={tw`flex-row justify-between items-center  `}>
      <View>
        <TText style={tw`text-2xl text-white font-bold`}>Plexbook</TText>
        <TText style={tw`text-sm text-white`}>Hi, {user?.displayName}</TText>
      </View>

      <TouchableOpacity
        onPress={() => {
          router.navigate('tab_profile');
        }}
        style={tw`flex-row gap-2`}>
        <Image
          source={{uri: user?.photoURL ?? ''}}
          style={tw`h-12 w-12 rounded-xl`}
        />
      </TouchableOpacity>
    </View>
  );
}
