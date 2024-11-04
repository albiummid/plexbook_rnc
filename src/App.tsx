import React, {useEffect} from 'react';
import ProviderWrapper from './components/layout/ProviderWrapper';
import NetworkStatus from './components/ui/NetworkStatus';
import UpdateChecker from './components/UpdateChecker';
import {RootNavigator} from './libs/navigation/Screens';
import {useDynamicLinks} from './libs/firebase';

import {
  backgroundOrQuitHandler,
  foregroundHandler,
} from './libs/navigation/linking';
import {useAuthState} from './libs/zustand';
import {ldbValues} from './libs/localDB';

export default function InitApp() {
  useDynamicLinks({
    backgroundOrQuitHandler,
    foregroundHandler,
  });

  useEffect(() => {
    useAuthState.setState({
      isAuthenticated: Boolean(
        ldbValues.getUserId() && ldbValues.getUserInfo(),
      ),
      user: ldbValues.getUserInfo(),
      userId: ldbValues.getUserId(),
    });
  }, []);

  return (
    <ProviderWrapper>
      <NetworkStatus />
      <UpdateChecker />
      <RootNavigator />
    </ProviderWrapper>
  );
}
