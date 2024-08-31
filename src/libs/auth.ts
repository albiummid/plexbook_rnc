import {
  GoogleOneTapSignIn,
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Somewhere in your code
export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleOneTapSignIn.signIn({
      webClientId: process.env.OAUTH_WEB_CLIENT_ID, // works only if you use Firebase
      // iosClientId: config.iosClientId, // only needed if you're not using Firebase
    });
    console.log(userInfo);
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
          // Android and Apple only. No saved credential found, try calling `createAccount`
          break;
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          break;
        case statusCodes.ONE_TAP_START_FAILED:
          // Android-only, you probably have hit rate limiting.
          // On Android, you can still call `presentExplicitSignIn` in this case.
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android-only: play services not available or outdated
          // Web: when calling an unimplemented api (requestAuthorization)
          break;
        default:
        // something else happened
      }
    } else {
      // an error that's not related to google sign in occurred
    }
  }
};
