import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {mergedStacks} from './Screens';
const Stack = createNativeStackNavigator();
export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      {mergedStacks.map((item: any, index: number) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
}
