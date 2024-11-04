import {useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {Image, Text, ToastAndroid, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import TText from '../components/ui/TText';
import TView from '../components/ui/TView';
import Icons from '../components/ui/vector-icons';
import {api} from '../libs/api';
import {deviceInfo} from '../libs/device';
import {signInWithGoogle, useFirebaseAuth} from '../libs/firebase';
import {ldbValues, localDB} from '../libs/localDB';
import {router} from '../libs/navigation/navigator';
import tw from '../libs/tailwind';
import {hp, wp} from '../libs/utils/Scaling';
import {logout, useAuthState, useOnboarding} from '../libs/zustand';
import ToggleButton from '../components/ui/ToggleButton';

export default function OnboardingScreen() {
  const halfPage = {height: wp(80), width: wp(100)};
  const fullPage = {height: hp(80), width: wp(100)};
  const {isAuthenticated, user} = useFirebaseAuth();
  const {
    disableScrolling,
    pageIndex,
    selectedLanguage,
    selectedGenre,
    enableScrolling,
    setPageIndex,
    scrollEnabled,
    nextEnabled,
    userDetails,
    doneEnabled,
    reset,
  } = useOnboarding();

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset();
      };
    }, []),
  );

  const onCompleteOnboarding = async () => {
    // let this userDoesn't exits
    if (!isAuthenticated) return;
    // let userPreference = {
    //   languageList: selectedLanguage,
    //   genreList: selectedGenre,
    // };
    // let userPref = await api.post('/user/save-user-preference', {
    //   userId: userDetails?._id,
    //   userPreference,
    // });
    // localDB.set(
    //   'onboarding',
    //   JSON.stringify(userPref.data.result.userPreference),
    // );
    router.replace('tab_root');
  };

  useEffect(() => {
    if (pageIndex == 0) {
      enableScrolling();
    } else if (pageIndex == 1) {
      isAuthenticated ? enableScrolling() : disableScrolling();
    } else if (pageIndex == 2) {
      !selectedGenre.length || !selectedLanguage.length
        ? disableScrolling()
        : enableScrolling();
    }
  }, [pageIndex, isAuthenticated, selectedGenre, selectedLanguage]);

  const pageList = useMemo(() => {
    return [
      {
        backgroundColor: '#000000',
        image: (
          <TView style={halfPage}>
            <FirstScreen />
          </TView>
        ),
        title: (
          <TText
            style={[tw`text-3xl text-white font-semibold`, {letterSpacing: 0}]}>
            <Text style={tw`text-primary font-bold  text-4xl`}>P</Text>lexbook
          </TText>
        ),
        subtitle: (
          <TText style={tw`text-white`}>
            Save your favorite content and share with friends.
          </TText>
        ),
      },
      {
        backgroundColor: '#000000',
        image: (
          <TView style={fullPage}>
            <SecondScreen />
          </TView>
        ),
        title: '',
        subtitle: '',
      },
      // {
      //   backgroundColor: '#F9AA33',
      //   image: (
      //     <TView style={fullPage}>
      //       <ThirdScreen />
      //     </TView>
      //   ),
      //   title: '',
      //   subtitle: '',
      // },
    ];
  }, [userDetails]);

  return (
    <Onboarding
      allowFontScaling
      controlStatusBar
      // flatlistProps={{scrollEnabled}}
      showNext={nextEnabled}
      showDone={isAuthenticated}
      pageIndexCallback={p => setPageIndex(p)}
      DoneButtonComponent={() => (
        <TouchableOpacity
          onPress={() => {
            onCompleteOnboarding();
          }}
          style={tw`px-4 py-2 m-2 rounded-lg bg-primary`}>
          <Text style={tw`text-black font-bold`}>Let's Get Started</Text>
        </TouchableOpacity>
      )}
      showSkip={false}
      pages={pageList}
    />
  );
}

const FirstScreen = () => {
  const {enableScrolling} = useOnboarding();
  // useEffect(() => {
  //   enableScrolling();
  // }, []);
  return (
    <LottieView
      source={require('../assets/lottie/loop.json')}
      style={{
        height: wp(100),
        width: wp(60),
        marginHorizontal: 'auto',
      }}
      autoPlay
      speed={3}
      loop
    />
  );
};

const SecondScreen = () => {
  const {user, isAuthenticated} = useAuthState();
  const handleGoogleSignIn = async () => {
    try {
      const {accessToken} = await signInWithGoogle();
      const {data} = await api.post('/auth/sign-in/social/google', {
        accessToken,
        deviceInfo: await deviceInfo(),
      });

      useAuthState.setState({
        userId: data.result.user._id,
        user: data.result.user,
        isAuthenticated: true,
        isLoading: false,
      });
      ldbValues.setUserId(data.result.user._id);
      ldbValues.setUserInfo(data.result.user);
    } catch (err) {
      if (String(err?.message) === 'Sign in action cancelled') {
        ToastAndroid.show(`User cancelled`, 1000);
      }
    }
  };

  return (
    <TView style={tw`flex-1 w-full`}>
      <TView style={tw`p-2 mb-5`}>
        <Text style={[tw`text-2xl text-white font-bold `]}>
          {isAuthenticated ? 'Signed In' : 'Sign In'}
        </Text>
        <Text style={[tw`text-base text-white  `]}>
          Join our PLEXBOOK community
        </Text>
      </TView>

      <LottieView
        source={require('../assets/lottie/translate.json')}
        style={{
          height: wp(100),
          width: wp(100),
          // marginHorizontal: 'auto',
        }}
        autoPlay
        speed={0.8}
        loop
      />

      {!isAuthenticated && (
        <TouchableOpacity
          onPress={() => {
            handleGoogleSignIn();
          }}
          style={tw`border flex-row mb-10 justify-center items-center gap-5 rounded-lg border-primary mx-auto w-80 px-5 py-2 mt-auto `}>
          <Icons.AntDesign name="google" color={'white'} size={30} />
          <TText style={tw`text-base text-white`}>Sign In with Google</TText>
        </TouchableOpacity>
      )}

      {isAuthenticated && (
        <TView style={tw`items-center`}>
          <Image
            source={{uri: user?.picture ?? ''}}
            style={tw`h-26 w-26 rounded-full mb-5`}
          />
          <TText style={tw`text-lg text-white font-semibold`}>
            {user?.name}
          </TText>
          <TText color={'white'}>logged in with {user?.email}</TText>
          <ToggleButton
            textStyle={tw`mt-1 w-40 text-center`}
            onPress={() => {
              logout();
            }}>
            Logout
          </ToggleButton>
        </TView>
      )}
    </TView>
  );
};

// const ThirdScreen = () => {
//   const {
//     selectedLanguage,
//     setSelectedLanguage,
//     setSelectedGenre,
//     selectedGenre,
//     disableScrolling,
//     enableScrolling,
//   } = useOnboarding();

//   const genreChipList = useMemo(
//     () =>
//       Object.entries(genresList)
//         .map(([id, name]) => ({
//           label: name,
//           value: {id, name},
//         }))
//         .sort((a, b) => a.label.length - b.label.length),
//     [],
//   );
//   const languageChipList = useMemo(
//     () =>
//       languageList
//         .map(x => ({
//           label: `${x.english_name}`,
//           value: x,
//         }))
//         .reverse(),
//     [],
//   );

//   // useEffect(() => {
//   //   if (!selectedGenre.length || !selectedLanguage) {
//   //     disableScrolling();
//   //   } else {
//   //     enableScrolling();
//   //   }
//   // }, [selectedGenre, selectedLanguage]);
//   return (
//     <TView style={tw`m-2`}>
//       <TText style={tw`text-2xl  text-black font-bold  `}>Favour</TText>
//       <TText style={tw`text-black `}>Get better recommendation ...</TText>
//       <LottieView
//         source={require('../assets/lottie/person_thinking.json')}
//         style={{
//           height: wp(60),
//           width: wp(90),
//           marginHorizontal: 'auto',
//         }}
//         autoPlay
//         speed={3}
//         loop
//       />
//       <TView style={tw`mt-2`}>
//         <TText style={tw`text-base text-black my-2 font-bold`}>
//           Choose the content language you like...
//         </TText>
//         <GroupedChips
//           onChange={v => setSelectedLanguage(v)}
//           itemList={languageChipList}
//           selectedList={selectedLanguage}
//         />
//       </TView>
//       <TView style={tw`mt-2`}>
//         <TText style={tw`text-base text-black my-2 font-bold`}>
//           Choose your favorite genre
//         </TText>
//         <GroupedChips
//           onChange={v => setSelectedGenre(v)}
//           itemList={genreChipList}
//           selectedList={selectedGenre}
//         />
//       </TView>
//     </TView>
//   );
// };
