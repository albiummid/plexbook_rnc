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

export function compareVersions(version1: string, version2: string) {
  // Split both versions into major, minor, and patch segments
  const v1 = version1.split('.').map(Number);
  const v2 = version2.split('.').map(Number);

  // Compare each segment (major, minor, patch)
  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const num1 = v1[i] || 0; // Use 0 if the segment is missing (e.g. '1.0' vs '1.0.0')
    const num2 = v2[i] || 0;

    if (num1 > num2) return 'greater'; // version1 is greater
    if (num1 < num2) return 'less'; // version2 is greater
  }

  return 'equal'; // versions are equal
}
