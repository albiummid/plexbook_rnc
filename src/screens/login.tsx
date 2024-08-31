import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import TText from '../components/ui/TText';
import {signInWithGoogle} from '../libs/firebase';
import tw from '../libs/tailwind';

export default function LoginScreen() {
  return (
    <View style={tw`flex-1`}>
      <Text
        style={[tw`text-3xl font-bold text-center my-5`, {letterSpacing: 2}]}>
        Plexbook
      </Text>

      <TouchableOpacity
        onPress={() => {
          signInWithGoogle().then(() => {});
        }}
        style={tw`border flex-row justify-center items-center gap-5 rounded-lg border-primary mx-auto px-5 py-2 mt-auto mb-20`}>
        <Image
          style={tw`h-10 w-10`}
          source={{
            uri: 'https://w7.pngwing.com/pngs/63/1016/png-transparent-google-logo-google-logo-g-suite-chrome-text-logo-chrome.png',
          }}
        />
        <TText style={tw`text-base text-black`}>SignIn with Google</TText>
      </TouchableOpacity>
    </View>
  );
}
