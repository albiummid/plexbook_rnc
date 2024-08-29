import React from 'react';
import {StyleProp, TextStyle, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import tw from '../../lib/tailwind';
import {router} from '../../navigation/navigator';
import TText from '../ui/TText';
import Icons from '../ui/vector-icons';
export default function Header({
  title,
  textStyle,
  onBackPress,
}: {
  title?: string;
  textStyle?: StyleProp<TextStyle>;
  onBackPress?: () => void;
}) {
  return (
    <View style={tw`p-2 flex-row items-center justify-between z-10 `}>
      {title && (
        <View style={tw`mx-auto`}>
          <TText style={textStyle}>{title}</TText>
        </View>
      )}
      <TouchableOpacity
        style={tw`ml-auto`}
        onPress={() => {
          router.goBack();
        }}>
        <Icons.AntDesign
          name="left"
          size={20}
          style={tw.style(`p-2 rounded-full`, `bg-primary`)}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}
