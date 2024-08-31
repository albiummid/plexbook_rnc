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
import tw from '../../libs/tailwind';
import TView from './TView';
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
    <TView>
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
                  `text-base mb-1`,
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
              <View style={tw`w-3/4 mx-auto  bg-primary h-1 rounded-lg`} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </TView>
  );
}
