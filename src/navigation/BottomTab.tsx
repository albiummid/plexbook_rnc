import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {colors} from '../constants/colors';
import {tabScreens} from './Screens';
const Tab = createBottomTabNavigator();
export default function BottomTab() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.active_tint,
          tabBarInactiveTintColor: colors.inactive_tint,
          headerShadowVisible: false,
          tabBarShowLabel: false,
        })}>
        <>
          {tabScreens.map((item, index) => {
            return (
              <Tab.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={item.options as BottomTabNavigationOptions}
              />
            );
          })}
        </>
      </Tab.Navigator>
    </>
  );
}
