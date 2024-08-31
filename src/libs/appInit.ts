import {CommonActions} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {ldbKeys} from '../constants/keys';
import {dispatch} from '../navigators/RootNavigation';
import {deviceHandshakeToServer} from '../services/api/auth.api';
import {getDeviceFCMToken} from './firebase';
import {ldb} from './ldb';

export const deviceInit = async () => {
  const deviceToken = ldb.get(ldbKeys.device_token);

  if (!deviceToken) {
    try {
      const device = await deviceHandshakeToServer({
        local_id: DeviceInfo.getUniqueIdSync(),
        kind: 'Android',
        fcm_token: await getDeviceFCMToken(),
        details: {
          brand: DeviceInfo.getBrand(),
          model: DeviceInfo.getModel(),
          name: DeviceInfo.getDeviceNameSync(),
          device_fingerprint: DeviceInfo.getFingerprintSync(),
          build_id: DeviceInfo.getBuildIdSync(),
          unique_id: DeviceInfo.getUniqueIdSync(),
        },
      });
      ldb.set(ldbKeys.device_token, device.device_token);
      ldb.set(ldbKeys.device_initialized, true);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('REGISTERED_DEVICE__');
  }
};
export const logout = async () => {
  ldb.clearAll();
  await deviceInit();
  const resetAction = CommonActions.reset({
    index: 1,
    routes: [{name: '/login'}],
  });
  dispatch(resetAction);
};
export const getAuth = () => {
  const accessToken = ldb.get(ldbKeys.access_token) ?? null;
  const userId = ldb.get(ldbKeys.user_id) ?? null;
  const isAuthenticated = Boolean(accessToken) && Boolean(userId);
  return {
    accessToken,
    userId,
    isAuthenticated,
  };
};
