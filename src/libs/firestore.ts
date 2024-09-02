import firestore from '@react-native-firebase/firestore';

export const firestoreCollection = (name: string) =>
  firestore().collection(name);

export const UserCollection = firestoreCollection('Users');
