import DeviceInfo from 'react-native-device-info';
export async function deviceInfo() {
  return {
    os: DeviceInfo.getSystemName(),
    osVersion: DeviceInfo.getSystemVersion(),
    device: DeviceInfo.getBrand(),
    deviceModel: DeviceInfo.getModel(),
    uniqueDeviceId: await DeviceInfo.getUniqueId(),
    deviceName: await DeviceInfo.getDeviceName(),
    deviceManufacturer: await DeviceInfo.getManufacturer(),
  };
}
