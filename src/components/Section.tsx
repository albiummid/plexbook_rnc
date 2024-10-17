import React, {PropsWithChildren, ReactNode} from 'react';
import {Text, TouchableOpacity, View, ViewProps} from 'react-native';
import tw from '../libs/tailwind';

type SectionProps = PropsWithChildren<
  ViewProps & {
    label: string;
    labelColor?: string;
    rightSection?: ReactNode;
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
    <View style={[tw`gap-1 pt-4 flex-1 bg-black px-2 `, props.style]}>
      <View style={tw.style(`flex-row items-center justify-between  mb-2 `)}>
        <Text
          style={tw`border-l-8 pl-4 border-primary text-white text-xl  font-bold ${
            labelColor ? `text-[${labelColor}]` : ' '
          }`}>
          {label}
        </Text>
        {rightSection ? (
          <View>{rightSection}</View>
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
      <View style={[tw`flex-1 gap-y-3`, props.style]}>{children}</View>
    </View>
  );
}
