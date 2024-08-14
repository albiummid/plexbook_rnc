import {View, Text, Platform, StatusBar} from 'react-native';
import React, {FC} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabIcon, {TTabRouteName} from './TabIcon';
import {tabScreens} from './screens';
import {colors} from '../constants/colors';
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
          tabBarIcon: ({focused, color, size}) => {
            return (
              <TabIcon
                routeName={route.name as TTabRouteName}
                color={color}
                focused={focused}
                size={size}
              />
            );
          },
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
