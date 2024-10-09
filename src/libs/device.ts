import DeviceInfo from 'react-native-device-info';
export async function deviceInfo() {
  return {
    os: DeviceInfo.getSystemName(),
    os_version: DeviceInfo.getSystemVersion(),
    device: DeviceInfo.getBrand(),
    device_model: DeviceInfo.getModel(),
    device_id: await DeviceInfo.getUniqueId(),
    device_name: await DeviceInfo.getDeviceName(),
    device_manufacturer: await DeviceInfo.getManufacturer(),
  };
}
