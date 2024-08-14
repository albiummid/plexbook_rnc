import {useCallback} from 'react';

export const wait = (second: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, second * 1000);
  });
