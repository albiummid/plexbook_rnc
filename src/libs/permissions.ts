import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';

export const checkInstallPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const d = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.REQUEST_INSTALL_PACKAGES,
        {
          title: 'Install APK Permission',
          message: 'App needs permission to install APKs from unknown sources',
          buttonPositive: 'OK',
        },
      );

      if (d !== PermissionsAndroid.RESULTS.GRANTED) {
        // User did not grant permission, redirect to settings
        Alert.alert(
          'Permission Required',
          'You need to allow permission to install unknown apps.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(), // Open settings so user can enable permission
            },
            {text: 'Cancel', style: 'cancel'},
          ],
          {cancelable: true},
        );
        return false;
      } else {
        console.log('Permission granted to install unknown apps.');
        return true;
      }
    } catch (error) {
      console.error('Error checking install permission:', error);
    }
  }
};

export async function requestStoragePermission() {
  try {
    if (Platform.OS === 'android') {
      const grantedWA = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download photos.',
          buttonPositive: 'Ok',
        },
      );
      const grantedRA = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download photos.',
          buttonPositive: 'Ok',
        },
      );
      return (
        grantedWA === PermissionsAndroid.RESULTS.GRANTED &&
        grantedRA === PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      return true;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}
