import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// import dynamicLinks from '@react-native-firebase/dynamic-links';
// import messaging from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';
export const codes = statusCodes;
GoogleSignin.configure({
  webClientId:
    '308361640597-jbusqmmorbk1k1ldgav99ce2oa647g0r.apps.googleusercontent.com',
});
export const signInWithGoogle = async () => {
  // Configure signInPackage
  await GoogleSignin.hasPlayServices();
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  const {additionalUserInfo} = await auth().signInWithCredential(
    googleCredential,
  );
  const {accessToken} = await GoogleSignin.getTokens();

  return {accessToken, userInfo: additionalUserInfo?.profile};
};

export const signOut = async () => {
  return await auth()
    .signOut()
    .then(async () => {
      GoogleSignin.revokeAccess();
    });
};

export const useFirebaseAuth = () => {
  // Set an initializing state whilst Firebase connects
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // console.log(user);

  // Handle user state changes
  useEffect(() => {
    setIsAuthenticated(Boolean(auth().currentUser));
    setUser(auth().currentUser);
    setIsLoading(false);
    const subscriber = () =>
      auth().onAuthStateChanged(e => {
        if (!e) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setUser(e);
          setIsAuthenticated(true);
        }

        setIsLoading(false);
      });
    return subscriber(); // unsubscribe on unmount
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
  };
};

// export const handleDynamicLinksInForeground = () => {
//   // call it in App.js's useEffect's inside of cleanup function
//   dynamicLinks().onLink(link => {
//     console.log('DYNAMIC_LINK_IN_FOREGROUND_MODE:_', link);
//   });
// };

// export const handleDynamicLinksInBackgroundOrQuitMode = () => {
//   // call it on useEffect in App.js
//   dynamicLinks()
//     .getInitialLink()
//     .then(link => {
//       console.log('DYNAMIC_LINK_IN_BACKGROUND_OR_QUIT_MODE:_', link);
//     });
// };

// export async function buildLink(linkURL) {
//   const link = await dynamicLinks().buildLink({
//     link: linkURL,
//     // domainUriPrefix is created in your Firebase console
//     domainUriPrefix: 'https://pptrknews.page.link',
//     // optional setup which updates Firebase analytics campaign
//     // "banner". This also needs setting up before hand
//     // analytics: {
//     //   campaign: 'banner',
//     // },
//   });

//   return link;
// }

// export const getDeviceFCMToken = async () => {
//   await messaging().registerDeviceForRemoteMessages();
//   const token = await messaging().getToken();
//   return token;
// };

// export const registerForegroundMessageListener = () =>
//   messaging().onMessage(async remoteMessage => {
//     Alert.alert(
//       'A new FCM message arrived!',
//       JSON.stringify(remoteMessage, null, 2),
//     );
//   });

// // Register background handler // put it in before appRegistry in index.js
// export const registerBackgroundMessageListener = () =>
//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log(
//       'Message handled in the background!',
//       JSON.stringify(remoteMessage, null, 2),
//     );
//   });
// // Register killState handler // put it in before appRegistry in index.js
// export const registerKillStateMessageListener = () =>
//   messaging().getInitialNotification(async remoteMessage => {
//     console.log(
//       'Message handled in the Kill state!',
//       JSON.stringify(remoteMessage, null, 2),
//     );
//   });

// export const signInWithFacebook = async () => {
//   // Attempt login with permissions
//   const result = await LoginManager.logInWithPermissions([
//     'public_profile',
//     'email',
//   ]);

//   if (result.isCancelled) {
//     throw 'User cancelled the login process';
//   }

//   // Once signed in, get the users AccessToken
//   const data = await AccessToken.getCurrentAccessToken();

//   if (!data) {
//     throw 'Something went wrong obtaining access token';
//   }

//   // Create a Firebase credential with the AccessToken
//   const facebookCredential = auth.FacebookAuthProvider.credential(
//     data.accessToken,
//   );

//   // Sign-in the user with the credential
//   return auth().signInWithCredential(facebookCredential);
// };

// Firebase db
// import database from '@react-native-firebase/database';
// import {ToastAndroid} from 'react-native';
// export const userDB = (userId: string) => database().ref(`/users/${userId}`);

import dynamicLinks, {
  FirebaseDynamicLinks,
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import {urlHelper} from './utils/helpers';

export async function createLink(
  params: Record<string, any>,
  linkInfo?: {
    description: string;
    imageURL: string;
    title: string;
  },
) {
  let link = `https://github.com/albiummid/plexbook_rnc/releases?${urlHelper.paramObjectToParams(
    params,
  )}`;
  return await dynamicLinks().buildLink({
    link,
    android: {
      minimumVersion: '3',
      packageName: 'com.plexbook_rnc',
      fallbackUrl: 'https://github.com/albiummid/plexbook_rnc/releases',
    },
    social:
      linkInfo !== null
        ? {
            descriptionText: linkInfo?.description,
            imageUrl: linkInfo?.imageURL,
            title: linkInfo?.title,
          }
        : undefined,
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: 'https://plexbook.page.link',
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
  });
}

export const useDynamicLinks = ({
  foregroundHandler = () => {},
  backgroundOrQuitHandler = () => {},
}: {
  foregroundHandler?: (
    link: FirebaseDynamicLinksTypes.DynamicLink | null,
  ) => void;
  backgroundOrQuitHandler?: (
    link: FirebaseDynamicLinksTypes.DynamicLink | null,
  ) => void;
}) => {
  const [hasBackgroundLink, setHasBackgroundLink] = useState(false);
  useEffect(() => {
    // For background / quit events
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        // ...set initial route as offers screen
        setHasBackgroundLink(link !== null);
        backgroundOrQuitHandler(link);
      });

    // Foreground events
    const unsubscribe = dynamicLinks().onLink(link => {
      // Handle dynamic link inside your own application
      // ...navigate to your offers screen
      foregroundHandler(link);
    });
    return () => unsubscribe();
  }, []);
  return {
    hasBackgroundLink,
  };
};
