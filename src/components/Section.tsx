import React, {PropsWithChildren} from 'react';
import {Text, TouchableOpacity, View, ViewProps} from 'react-native';
import tw from '../lib/tailwind';

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
    <View style={tw`gap-2 my-4`}>
      <View
        style={tw.style(`flex-row items-center justify-between mx-2 mb-2 `)}>
        <Text
          style={tw`border-l-8 pl-4 border-primary text-xl  font-bold ${
            labelColor ? `text-[${labelColor}]` : ''
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
      <View style={props.style}>{children}</View>
    </View>
  );
}
