import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useFirebaseAuth} from '../libs/firebase';
import tw from '../libs/tailwind';
import {router} from '../navigation/navigator';
import TText from './ui/TText';

export default function HomeHeader() {
  const {user} = useFirebaseAuth();
  if (!user) return;

  return (
    <View style={tw`flex-row justify-between m-2`}>
      <View>
        <TText style={tw`text-xl font-bold`}>Plex | Book</TText>
        <TText style={tw`text-sm`}>Hi, {user?.displayName}</TText>
      </View>

      <TouchableOpacity
        onPress={() => {
          router.navigate('tab_profile');
        }}
        style={tw`flex-row gap-2`}>
        <Image
          source={{uri: user?.photoURL ?? ''}}
          style={tw`h-10 w-10 rounded-xl`}
        />
      </TouchableOpacity>
    </View>
  );
}
