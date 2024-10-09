import React from 'react';
import {View} from 'react-native';
import tw from '../libs/tailwind';
import ContentSection from './profile/ContentSection';

export default function TempScreen() {
  return (
    <View style={tw`flex-1 bg-black p-2`}>
      <ContentSection />
    </View>
  );
}
