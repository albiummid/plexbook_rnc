import LottieView from 'lottie-react-native';
import React, {useEffect, useMemo} from 'react';
import {
  FlatListProps,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Onboarding, {Page} from 'react-native-onboarding-swiper';
import GroupedChips from '../components/ui/GroupedChips';
import TText from '../components/ui/TText';
import TView from '../components/ui/TView';
import {genresList, languageList} from '../constants/emums';
import {api} from '../libs/api';
import {deviceInfo} from '../libs/device';
import {signInWithGoogle, signOut, useFirebaseAuth} from '../libs/firebase';
import {localDB} from '../libs/localDB';
import tw from '../libs/tailwind';
import {hp, wp} from '../libs/utils/Scaling';
import {useOnboarding} from '../libs/zustand';
import {router} from '../navigation/navigator';

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
  } = useOnboarding();

  useEffect(() => {
    if (pageIndex == 1 && !isAuthenticated) {
      disableScrolling();
    } else if (
      pageIndex == 2 &&
      (selectedLanguage.length == 0 || selectedGenre.length == 0)
    ) {
      disableScrolling();
    } else {
      enableScrolling();
    }
  }, [pageIndex, isAuthenticated, selectedLanguage, selectedGenre]);

  const onCompleteOnboarding = async () => {
    // let this userDoesn't exits
    if (!isAuthenticated) return;
    let userPreference = {
      languageList: selectedLanguage,
      genreList: selectedGenre,
    };
    let userPref = await api.post('/user/save-user-preference', {
      userId: userDetails?._id,
      userPreference,
    });
    localDB.set(
      'onboarding',
      JSON.stringify(userPref.data.result.userPreference),
    );
    router.replace('tab_root');
  };

  const pageList = useMemo(() => {
    return [
      {
        backgroundColor: '#fff',
        image: (
          <TView style={halfPage}>
            <FirstScreen />
          </TView>
        ),
        title: (
          <TText
            style={[tw`text-3xl text-black font-semibold`, {letterSpacing: 0}]}>
            <Text style={tw`text-primary font-bold  text-4xl`}>P</Text>lexbook
          </TText>
        ),
        subtitle: (
          <TText style={tw`text-black`}>
            Save your favorite content and share with friends.
          </TText>
        ),
      },
      {
        backgroundColor: '#fff',
        image: (
          <TView style={fullPage}>
            <SecondScreen />
          </TView>
        ),
        title: '',
        subtitle: '',
      },
      {
        backgroundColor: '#F9AA33',
        image: (
          <TView style={fullPage}>
            <ThirdScreen />
          </TView>
        ),
        title: '',
        subtitle: '',
      },
    ];
    // .filter((x, i, arr) => {
    //   if (!userDetails?.userPreference && i == 2) {
    //     return false;
    //   }
    //   return true;
    // });
  }, [userDetails]);

  return (
    <Onboarding
      allowFontScaling
      controlStatusBar
      flatlistProps={{scrollEnabled} as FlatListProps<Page>}
      showNext={nextEnabled}
      showDone={doneEnabled}
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
  const {user, isAuthenticated} = useFirebaseAuth();
  const {setSelectedGenre, setSelectedLanguage, setUserDetails} =
    useOnboarding();
  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      const user = await api.post('/auth/signIn/google', {
        uid: res.user.uid,
        userInfo: res.additionalUserInfo,
        deviceInfo: deviceInfo(),
      });
      setUserDetails(user.data.result);
      setSelectedGenre(user.data.result.userPreference?.genreList ?? []);
      setSelectedLanguage(user.data.result.userPreference?.languageList ?? []);
      localDB.set('userId', user.data.result._id);
      localDB.set('userInfo', JSON.stringify(user.data.result));

      ToastAndroid.showWithGravity(
        `Welcome back ${res.user.displayName} !`,
        2000,
        ToastAndroid.TOP,
      );
    } catch (err) {
      ToastAndroid.show(`SignIn error :${String(err)}`, 2000);
    }
  };
  return (
    <TView style={tw`flex-1 w-full`}>
      <TView style={tw`p-2 mb-5`}>
        <Text style={[tw`text-2xl font-bold `]}>
          {isAuthenticated ? 'Signed In' : 'Sign In'}
        </Text>
        <Text style={[tw`text-base  `]}>Join our PLEXBOOK community</Text>
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
          <Image
            style={tw`h-5 w-5`}
            source={{
              uri: 'https://w7.pngwing.com/pngs/63/1016/png-transparent-google-logo-google-logo-g-suite-chrome-text-logo-chrome.png',
            }}
          />
          <TText style={tw`text-base text-black`}>Sign In with Google</TText>
        </TouchableOpacity>
      )}

      {isAuthenticated && (
        <TView style={tw`items-center`}>
          <Image
            source={{uri: user?.photoURL ?? ''}}
            style={tw`h-26 w-26 rounded-full mb-5`}
          />
          <TText style={tw`text-lg text-black font-semibold`}>
            {user?.displayName}
          </TText>
          <TText>logged in with {user?.email}</TText>
          <TText
            onPress={() => {
              signOut();
            }}>
            Signout
          </TText>
        </TView>
      )}
    </TView>
  );
};

const ThirdScreen = () => {
  const {
    selectedLanguage,
    setSelectedLanguage,
    setSelectedGenre,
    selectedGenre,
    userDetails,
  } = useOnboarding();

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  const genreChipList = useMemo(
    () =>
      Object.entries(genresList)
        .map(([id, name]) => ({
          label: name,
          value: {id, name},
        }))
        .sort((a, b) => a.label.length - b.label.length),
    [],
  );
  const languageChipList = useMemo(
    () =>
      languageList
        .map(x => ({
          label: `${x.english_name}`,
          value: x,
        }))
        .reverse(),
    [],
  );
  return (
    <TView style={tw`m-2`}>
      <TText style={tw`text-2xl  text-black font-bold  `}>Favour</TText>
      <TText style={tw`text-black `}>Get better recommendation ...</TText>
      <LottieView
        source={require('../assets/lottie/person_thinking.json')}
        style={{
          height: wp(60),
          width: wp(90),
          marginHorizontal: 'auto',
        }}
        autoPlay
        speed={3}
        loop
      />
      <TView style={tw`mt-2`}>
        <TText style={tw`text-base text-black my-2 font-bold`}>
          Choose the content language you like...
        </TText>
        <GroupedChips
          onChange={v => setSelectedLanguage(v)}
          itemList={languageChipList}
          selectedList={selectedLanguage}
        />
      </TView>
      <TView style={tw`mt-2`}>
        <TText style={tw`text-base text-black my-2 font-bold`}>
          Choose your favorite genre
        </TText>
        <GroupedChips
          onChange={v => setSelectedGenre(v)}
          itemList={genreChipList}
          selectedList={selectedGenre}
        />
      </TView>
    </TView>
  );
};
