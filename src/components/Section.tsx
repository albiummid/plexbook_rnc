import React, {PropsWithChildren} from 'react';
import {Text, TouchableOpacity, View, ViewProps} from 'react-native';
import tw from '../libs/tailwind';

type SectionProps = PropsWithChildren<
  ViewProps & {
    label: string;
    labelColor?: string;
    rightSection?: () => JSX.Element;
  } & {
    rightButtonTitle?: string;
    onRightButtonPress?: () => void;
  }
>;

export default function Section({
  label,
  onRightButtonPress,
  rightButtonTitle,
  children,
  labelColor,
  rightSection,
  ...props
}: SectionProps) {
  return (
    <View style={tw`gap-1 mt-4 flex-1 `}>
      <View
        style={tw.style(`flex-row items-center justify-between mx-2 mb-2 `)}>
        <Text
          style={tw`border-l-8 pl-4 border-primary text-xl  font-bold ${
            labelColor ? `text-[${labelColor}]` : ' text-black'
          }`}>
          {label}
        </Text>
        {rightSection ? (
          <>{rightSection}</>
        ) : (
          <>
            {rightButtonTitle && (
              <TouchableOpacity
                onPress={() => {
                  if (onRightButtonPress) {
                    onRightButtonPress();
                  }
                }}
                activeOpacity={0.5}>
                <Text
                  style={tw` border border-orange-400 text-primary  px-3 py-1 rounded-lg `}>
                  {rightButtonTitle}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <View style={[tw`flex-1`, props.style]}>{children}</View>
    </View>
  );
}
