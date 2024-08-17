import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import React, {PropsWithChildren} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {clientPersister} from '../../lib/tanstack';
import {getMS} from '../../lib/utils/helpers';
import {NavigationProvider} from '../../navigation/navigator';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: getMS.hour(5), // 24 hours
    },
  },
});
export default function ProviderWrapper({children}: PropsWithChildren) {
  return (
    <NavigationProvider>
      <GestureHandlerRootView>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{persister: clientPersister}}>
          <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
        </PersistQueryClientProvider>
      </GestureHandlerRootView>
    </NavigationProvider>
  );
}
