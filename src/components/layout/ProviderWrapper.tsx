import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import React, {PropsWithChildren} from 'react';
import {StatusBar} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProvider} from '../../libs/navigation/navigator';
import {clientPersister} from '../../libs/tanstack';
import {getMS} from '../../libs/utils/helpers';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: getMS.second(5), // 24 hours
    },
  },
});
export default function ProviderWrapper({children}: PropsWithChildren) {
  return (
    <NavigationProvider>
      <StatusBar translucent />
      <GestureHandlerRootView>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{persister: clientPersister}}>
          <SheetProvider>
            <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
          </SheetProvider>
        </PersistQueryClientProvider>
      </GestureHandlerRootView>
    </NavigationProvider>
  );
}
