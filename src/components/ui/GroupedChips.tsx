import React, {PropsWithChildren} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import tw from '../../libs/tailwind';
type Item = {
  label: string;
  value: string | any;
};

type Props = {
  itemList: Item[];
  selectedList: Item[];
  onChange: (x: Item[]) => void;
  style?: StyleProp<TextStyle>;
  selectedStyle?: StyleProp<TextStyle>;
  chipsStyle?: StyleProp<TextStyle>;
  chipsSelectedStyle?: StyleProp<TextStyle>;
};

export const ChipsButton = ({
  selectedStyle,
  ...props
}: PropsWithChildren<
  TouchableOpacityProps & {
    selected?: boolean;
    selectedStyle?: StyleProp<TextStyle>;
  }
>) => {
  return (
    <TouchableOpacity onPress={props?.onPress ?? undefined}>
      <Text
        style={[
          tw.style(
            `text-black border px-2 py-1 rounded-3xl border-black mr-auto`,
            props.selected && 'text-white bg-black',
          ),
          props?.style,
          props.selected && selectedStyle,
        ]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};
export default function GroupedChips({
  itemList,
  selectedList,
  style,
  onChange,
  chipsStyle,
  chipsSelectedStyle,
}: Props) {
  return (
    <View style={[tw`flex-row gap-2 flex-wrap`, style]}>
      {itemList.map((x, i) => {
        const selectedIndex = selectedList?.findIndex(y => x.label === y.label);
        const selected = selectedIndex > -1;

        return (
          <ChipsButton
            onPress={() => {
              let list = [...selectedList];

              if (selected) {
                list.splice(selectedIndex, 1);
              } else {
                list.push(x);
              }

              onChange(list);
            }}
            selected={selected}
            style={chipsStyle}
            selectedStyle={chipsSelectedStyle}
            key={i}>
            {x.label}
          </ChipsButton>
        );
      })}
    </View>
  );
}
