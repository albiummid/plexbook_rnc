import React from 'react';
import ProviderWrapper from './components/layout/ProviderWrapper';
import './components/sheets/ActionSheet';
import {fToastState} from './components/ui/FloatingToast';
import NetworkStatus from './components/ui/NetworkStatus';
import UpdateChecker from './components/UpdateChecker';
import {RootNavigator} from './libs/navigation/Screens';

export default function InitApp() {
  console.log(fToastState.getState());
  return (
    <ProviderWrapper>
      <NetworkStatus />
      <UpdateChecker />
      <RootNavigator />
    </ProviderWrapper>
  );
}
