let second = (s: number = 1) => 1000 * s;
let minute = (m: number = 1) => second(60) * m;
let hour = (h: number = 1) => minute(60) * h;
let day = (d: number = 1) => hour(24) * d;
let week = (w: number = 1) => day(7) * w;

export const getMS = {
  second,
  minute,
  hour,
  day,
  week,
};

export function fisherYatesShuffle(array: any[]) {
  let clone = JSON.parse(JSON.stringify(array));
  // for (let i = clone.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [clone[i], clone[j]] = [clone[j], clone[i]];
  // }
  return clone;
}

export const wait = (ms: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });

export const uniqueArray = (array: any[]) =>
  Array.from(new Set(array?.map(item => JSON.stringify(item)))).map(str =>
    JSON.parse(str),
  );

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const labelToValue = (label: string) =>
  label.split(' ').join('_').toLowerCase();
