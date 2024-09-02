import React, {useEffect} from 'react';
import ProviderWrapper from './components/layout/ProviderWrapper';
import './components/ui/ActionSheet';
import {api} from './libs/api';
import {useFirebaseAuth} from './libs/firebase';
import {useAppConfig} from './libs/zustand';
import {RootNavigator} from './navigation/Screens';

export default function InitApp() {
  const {user} = useFirebaseAuth();
  console.log(user);
  const {ENV, setENV} = useAppConfig();
  // console.log(user.uid);
  useEffect(() => {
    (async () => {
      //

      // console.log(GoogleSignin.revokeAccess());
      try {
        const a = await api.get('/auth/health-check');
        console.log(a.data, 'albi');
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user]);

  return (
    <ProviderWrapper>
      <RootNavigator />
    </ProviderWrapper>
  );
}
