import React, {useEffect, useState} from 'react';
import ProviderWrapper from './components/layout/ProviderWrapper';
import MainNavigator from './navigation/MainNavigator';
import SplashScreen from './screens/splash';

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
