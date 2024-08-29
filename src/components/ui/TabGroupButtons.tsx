import React from 'react';
import {
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import tw from '../../lib/tailwind';
type TTabItem = {label: string; value: string};

export default function TabGroupButtons({
  tabItems,
  activeTintColor,
  inactiveTintColor,
  textStyle,
  activeItem,
  onChange,
  containerStyle,
}: {
  tabItems: TTabItem[];
  activeItem: string;
  defaultActive?: string;
  activeTintColor?: string;
  inactiveTintColor?: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onChange: (x: string) => void;
}) {
  return (
    <ScrollView horizontal style={[tw`gap-2`, containerStyle]}>
      {tabItems.map(x => (
        <TouchableOpacity
          onPress={() => {
            onChange(x.value);
          }}
          style={tw`ml-2 mr-2  mb-5`}
          key={x.value}>
          <Text
            style={[
              tw.style(
                `text-base`,
                `${inactiveTintColor ? `text-[${activeTintColor}]` : ''}`,
                `  text-center ${
                  activeItem === x.value
                    ? `font-bold ${
                        activeTintColor ? `text-[${activeTintColor}]` : ''
                      }  `
                    : ''
                } `,
              ),
              textStyle,
            ]}>
            {x.label}
          </Text>
          {activeItem === x.value && (
            <View style={tw`w-full mx-auto bg-primary h-1 rounded-lg`} />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
