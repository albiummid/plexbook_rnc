import React, {ReactNode} from 'react';
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
export type TTabItem = {
  label: string | ReactNode;
  value: string;
  component?: () => React.ReactNode;
};

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
  const Component = tabItems.find(x => x.value === activeItem)?.component;
  return (
    <>
      <View style={[containerStyle]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[tw`gap-2 `]}>
          {tabItems.map(x => (
            <TouchableOpacity
              onPress={() => {
                onChange(x.value);
              }}
              style={tw`mx-2 `}
              key={x.value}>
              {typeof x.label === 'string' ? (
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
              ) : (
                <TView>{x.label}</TView>
              )}
              {activeItem === x.value && (
                <View style={tw`w-3/4 mx-auto   bg-primary h-1 rounded-lg`} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {Component ? <Component /> : null}
    </>
  );
}
