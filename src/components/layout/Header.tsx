import React from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {router} from '../../libs/navigation/navigator';
import tw from '../../libs/tailwind';
import TText from '../ui/TText';
import Icons from '../ui/vector-icons';
export default function Header({
  title,
  textStyle,
  onBackPress,
  containerStyle,
}: {
  title?: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onBackPress?: () => void;
}) {
  return (
    <View
      style={[
        tw` flex-row items-center justify-between z-10 `,
        containerStyle,
      ]}>
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
      {title && (
        <View style={tw`mx-auto`}>
          <TText style={[tw`font-bold text-black text-lg`, textStyle]}>
            {title}
          </TText>
        </View>
      )}
    </View>
  );
}
