import React from 'react';
import ProviderWrapper from './components/layout/ProviderWrapper';
import NetworkStatus from './components/ui/NetworkStatus';
import UpdateChecker from './components/UpdateChecker';
import {RootNavigator} from './libs/navigation/Screens';

export default function InitApp() {
  return (
    <ProviderWrapper>
      <NetworkStatus />
      <UpdateChecker />
      <RootNavigator />
    </ProviderWrapper>
  );
}
