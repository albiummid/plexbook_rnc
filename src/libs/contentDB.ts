import {MMKV} from 'react-native-mmkv';

export const contentDB = new MMKV({id: 'content-db'});

export const setContentByCTypeAndId = (
  id: number,
  cType: 'movie' | 'tv',
  data: any,
) => {
  contentDB.set(`${cType}-${id}`, JSON.stringify(data));
  return getContentByCTypeAndId(id, cType);
};

export const getContentByCTypeAndId = (id: number, cType: 'movie' | 'tv') => {
  const content = contentDB.getString(`${cType}-${id}`) ?? '';
  if (content?.length > 0) {
    return JSON.parse(content);
  }
  return null;
};

export const clearContentDB = () => contentDB.clearAll();
