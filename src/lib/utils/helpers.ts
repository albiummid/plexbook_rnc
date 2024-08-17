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

export const wait = (second: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, second * 1000);
  });
