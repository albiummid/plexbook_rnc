import DeviceInfo from 'react-native-device-info';
export async function deviceInfo() {
  return {
    os: DeviceInfo.getSystemName(),
    os_version: DeviceInfo.getSystemVersion(),
    device: DeviceInfo.getBrand(),
    device_model: DeviceInfo.getModel(),
    device_id: DeviceInfo.getUniqueId(),
    device_name: DeviceInfo.getDeviceName(),
    device_manufacturer: DeviceInfo.getManufacturer(),
  };
}
