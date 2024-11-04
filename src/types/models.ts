export interface User {
  __v: number;
  _id: string;
  createdAt: string;
  deviceInfo: DeviceInfo;
  uid: string;
  updatedAt: string;
  userInfo: UserInfo;
  userPreference: UserPreference;
}

interface UserPreference {
  genreList: function[][];
  languageList: function[][];
}

interface UserInfo {
  isNewUser: boolean;
  profile: Profile;
  providerId: string;
}

interface Profile {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  name: string;
  picture: string;
  sub: string;
}

interface DeviceInfo {
  _h: number;
  _i: number;
  _j: J;
  _k: null;
}

interface J {
  device: string;
  device_id: function[];
  device_manufacturer: function[];
  device_model: string;
  device_name: function[];
  os: string;
  os_version: string;
}
