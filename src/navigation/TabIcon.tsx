import React, {PropsWithChildren} from 'react';

import {routes} from './screens';
import {Text, View} from 'react-native';
import tw from '../lib/tailwind';
import Icons from '../components/ui/vector-icons';

type TabIconProps = {
  routeName: string;
  focused: boolean;
  color: string;
  size?: number;
};
export type TTabRouteName = 'home' | 'search' | 'profile';

export default function TabIcon({routeName, focused, ...props}: TabIconProps) {
  const IconWrapper = ({children, name}: PropsWithChildren<{name: string}>) => {
    return (
      <View
        style={tw.style(`border-primary`, {
          'border-2 px-2 py-1 rounded-md flex-row gap-2  items-center': focused,
        })}>
        {children}
        {focused && <Text style={tw`font-semibold text-primary`}>{name}</Text>}
      </View>
    );
  };
  return (
    <>
      {routeName === routes.tab.home && (
        <IconWrapper name="Home">
          <Icons.Feather name={'home'} {...props} />
        </IconWrapper>
      )}
      {routeName === routes.tab.search && (
        <IconWrapper name="Search">
          <Icons.Feather name={'search'} {...props} />
        </IconWrapper>
      )}
      {routeName === routes.tab.profile && (
        <IconWrapper name="Profile">
          <Icons.Feather name="user" {...props} />
        </IconWrapper>
      )}
    </>
  );
}
