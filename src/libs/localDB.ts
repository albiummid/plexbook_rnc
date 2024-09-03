import {MMKV} from 'react-native-mmkv';

export const localDB = new MMKV();

export const ldb = {
  getObject: (key: string) => JSON.parse(localDB.getString(key) ?? 'null'),
  setObject: (key: string, value: object) =>
    localDB.set(key, JSON.stringify(value)),
};
export const ldbValues = {
  getUserId: () => localDB.getString('userId'),
  getUserInfo: () => ldb.getObject('userInfo'),
};