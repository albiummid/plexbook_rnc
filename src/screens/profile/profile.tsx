import React from 'react';
import {Alert, Image, View} from 'react-native';
import TImage from '../../components/ui/TImage';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import Icons from '../../components/ui/vector-icons';
import {signOut, useFirebaseAuth} from '../../libs/firebase';
import {router} from '../../libs/navigation/navigator';
import tw from '../../libs/tailwind';
import ContentSection from './ContentSection';
export default function ProfileScreen() {
  const {user} = useFirebaseAuth();

  return (
    <View style={tw`px-2 flex-1 bg-black`}>
      <TView style={tw`justify-between flex-row items-center `}>
        <TText style={tw`text-white font-bold text-xl`}>My Profile</TText>
        <Icons.Feather
          onPress={() => {
            Alert.alert(
              'Logout confirmation',
              'All your information and list saved in cloud. \nDo you want to logout ?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                  onPress: () => {},
                },
                {
                  text: 'Logout',
                  style: 'default',
                  onPress: () => {
                    signOut().then(() => {
                      router.navigate('onboarding');
                    });
                  },
                },
              ],
            );
          }}
          style={tw`p-2 rounded-full border m-2 border-primary text-primary ml-auto h-10 w-10`}
          size={25}
          name="log-out"
        />
      </TView>
      <TView style={tw`flex-row gap-2  justify-start items-center`}>
        <TImage
          source={{
            uri:
              user?.photoURL ??
              Image.resolveAssetSource(
                require('../../assets/images/avatar.webp'),
              ).uri,
          }}
          style={tw`h-10 w-10 rounded-full`}
        />
        <TView>
          <TText style={tw`text-base font-bold text-white`}>
            {user?.displayName}
          </TText>
          <TText style={tw`text-white text-xs`}>{user?.email}</TText>
        </TView>
      </TView>
      <ContentSection />
    </View>
  );
}
