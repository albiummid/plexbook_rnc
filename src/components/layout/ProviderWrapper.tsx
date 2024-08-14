import React, {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationProvider} from '../../navigation/navigator';
import {clientPersister} from '../../lib/tanstack.query';

export default function ProviderWrapper({children}: PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
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
