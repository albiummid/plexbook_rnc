import React from 'react';
import ProviderWrapper from './components/layout/ProviderWrapper';
import './components/ui/ActionSheet';
import {RootNavigator} from './navigation/Screens';

export default function InitApp() {
  return (
    <ProviderWrapper>
      <RootNavigator />
    </ProviderWrapper>
  );
}
