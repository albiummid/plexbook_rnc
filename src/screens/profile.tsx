import React from 'react';
import {View} from 'react-native';
import Icons from '../components/ui/vector-icons';
import {signOut} from '../libs/firebase';
import tw from '../libs/tailwind';
import {router} from '../navigation/navigator';

export default function ProfileScreen() {
  return (
    <View>
      <Icons.Feather
        onPress={() => {
          signOut().then(() => {
            router.navigate('onboarding');
          });
        }}
        style={tw`p-2 rounded-full bg-primary h-10 w-10`}
        size={25}
        name="log-out"
      />
    </View>
  );
}
