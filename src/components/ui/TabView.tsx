import React, {useState} from 'react';
import {
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from '../../lib/tailwind';

export default function TabView({
  tabItems,
  defaultActive,
  stickyTab,
  activeTintColor,
  inactiveTintColor,
  textStyle,
}: {
  tabItems: {name: string; component: () => JSX.Element}[];
  defaultActive?: string;
  stickyTab?: boolean;
  activeTintColor?: string;
  inactiveTintColor?: string;
  textStyle?: StyleProp<TextStyle>;
}) {
  const [active, setActive] = useState(defaultActive ?? tabItems[0].name);
  const {name, component: Component} =
    tabItems.find(x => x.name === active) || tabItems[0];

  return (
    <ScrollView>
      <ScrollView
        horizontal
        style={tw.style('', stickyTab ? 'absolute left-0' : '')}>
        {tabItems.map(x => (
          <TouchableOpacity
            onPress={() => {
              setActive(x.name);
            }}
            style={tw`ml-2 my-5`}
            key={x.name}>
            <Text
              style={[
                tw.style(
                  `text-base`,
                  `${inactiveTintColor ? `text-[${activeTintColor}]` : ''}`,
                  `  text-center ${
                    active === x.name
                      ? `font-bold ${
                          activeTintColor ? `text-[${activeTintColor}]` : ''
                        }  `
                      : ''
                  } `,
                ),
                textStyle,
              ]}>
              {x.name}
            </Text>
            {active === x.name && (
              <View style={tw`w-2/3 mx-auto bg-primary h-1 rounded-lg`} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{flex: 1}}>
        <Component key={name} />
      </View>
    </ScrollView>
  );
}
