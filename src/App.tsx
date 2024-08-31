import React, {useEffect} from 'react';
import ProviderWrapper from './components/layout/ProviderWrapper';
import './components/ui/ActionSheet';
import {deviceInfo} from './libs/device';
import {localDB} from './libs/localDB';
import {RootNavigator} from './navigation/Screens';

export default function InitApp() {
  useEffect(() => {
    deviceInfo().then(v => {
      localDB.set('deviceInfo', JSON.stringify(v));
    });
  }, []);
  return (
    <ProviderWrapper>
      <RootNavigator />
    </ProviderWrapper>
  );
}
