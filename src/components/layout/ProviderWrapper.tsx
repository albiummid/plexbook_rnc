import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import React, {PropsWithChildren} from 'react';
import {SheetProvider} from 'react-native-actions-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProvider} from '../../libs/navigation/navigator';
import {clientPersister} from '../../libs/tanstack';
import {getMS} from '../../libs/utils/helpers';
import FloatingToast from '../ui/FloatingToast';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: getMS.day(1), // 24 hours
    },
  },
});
export default function ProviderWrapper({children}: PropsWithChildren) {
  return (
    <>
      <GestureHandlerRootView>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{persister: clientPersister}}>
          <SheetProvider>
            <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
          </SheetProvider>
        </PersistQueryClientProvider>
      </GestureHandlerRootView>
      <FloatingToast />
    </>
  );
}
