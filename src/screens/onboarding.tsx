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
import {signInWithGoogle, useFirebaseAuth} from '../libs/firebase';
import tw from '../libs/tailwind';
import {hp, wp} from '../libs/utils/Scaling';
import {useOnboarding} from '../libs/zustand';
import {router} from '../navigation/navigator';

export default function OnboardingScreen() {
  const halfPage = {height: wp(80), width: wp(90)};
  const fullPage = {height: hp(80), width: wp(90)};
  const {isAuthenticated, user} = useFirebaseAuth();
  const {
    disableScrolling,
    pageIndex,
    selectedItems,
    enableScrolling,
    setPageIndex,
    scrollEnabled,
    nextEnabled,
    doneEnabled,
  } = useOnboarding();

  useEffect(() => {
    if ((pageIndex == 1 && !isAuthenticated) || selectedItems.length === 0) {
      disableScrolling();
    } else {
      enableScrolling();
    }
  }, [pageIndex, isAuthenticated, selectedItems]);

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
            router.replace('tab_root');
          }}
          style={tw`px-4 py-2 m-2 rounded-lg bg-primary`}>
          <Text style={tw`text-black font-bold`}>Let's Get Started</Text>
        </TouchableOpacity>
      )}
      showSkip={false}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <TView style={halfPage}>
              <FirstScreen />
            </TView>
          ),
          title: (
            <TText
              style={[
                tw`text-3xl text-black font-semibold`,
                {letterSpacing: 0},
              ]}>
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
      ]}
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
  return (
    <TView style={tw`flex-1`}>
      <Text
        style={[tw`text-3xl font-bold text-center my-5`, {letterSpacing: 2}]}>
        Welcome to Plexbook
      </Text>

      {!isAuthenticated && (
        <TouchableOpacity
          onPress={() => {
            signInWithGoogle().then(() => {
              ToastAndroid.show(
                `Hi ${user?.displayName}, Welcome back !`,
                2000,
              );
            });
          }}
          style={tw`border flex-row justify-center items-center gap-5 rounded-lg border-primary mx-auto px-5 py-2 mt-auto mb-20`}>
          <Image
            style={tw`h-10 w-10`}
            source={{
              uri: 'https://w7.pngwing.com/pngs/63/1016/png-transparent-google-logo-google-logo-g-suite-chrome-text-logo-chrome.png',
            }}
          />
          <TText style={tw`text-base text-black`}>SignIn with Google</TText>
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
        </TView>
      )}
    </TView>
  );
};

const ThirdScreen = () => {
  const {selectedItems, setSelectedItem, setSelectedGenre, selectedGenre} =
    useOnboarding();

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
    <TView>
      <TText style={tw`text-2xl  text-black font-bold  `}>Recommendation</TText>
      <TText style={tw`text-black `}>
        Share your interest and get better recommendation ...
      </TText>
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
          onChange={v => setSelectedItem(v)}
          itemList={languageChipList}
          selectedList={selectedItems}
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
