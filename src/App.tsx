import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProviderWrapper from './components/layout/ProviderWrapper';
import {colors} from './constants/colors';
import SplashScreen from './screens/splash';
import MainNavigator from './navigation/MainNavigator';

export default function InitApp() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (isLoading) return <SplashScreen />;
  return (
    <ProviderWrapper>
      <MainNavigator />
    </ProviderWrapper>
  );
}
