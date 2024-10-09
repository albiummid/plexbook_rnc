import React, {useEffect} from 'react';
import {Alert, Linking} from 'react-native';
import {config} from '../app.config';
import ProviderWrapper from './components/layout/ProviderWrapper';
import './components/sheets/ActionSheet';
import {api} from './libs/api';
import {RootNavigator} from './libs/navigation/Screens';

export default function InitApp() {
  useEffect(() => {
    api.post('/auth/version/check', {version: config.version}).then(data => {
      if (data.data.result.hasUpdate) {
        Alert.alert(
          'Update',
          `App version v${data.data.result.version} released.\nDownload and update this app`,
          [
            {
              text: 'Open download link',
              onPress: () => {
                Linking.openURL(data.data.result.downloadURL);
              },
            },
          ],
        );
      }
    });
  }, []);
  return (
    <ProviderWrapper>
      <RootNavigator />
    </ProviderWrapper>
  );
}
