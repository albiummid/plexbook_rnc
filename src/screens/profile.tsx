import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useMemo, useState} from 'react';
import {Alert, FlatList, Image, TouchableOpacity, View} from 'react-native';
import MovieCard from '../components/content/card/movie-card';
import SeriesCard from '../components/content/card/series-card';
import TabGroupButtons from '../components/ui/TabGroupButtons';
import TImage from '../components/ui/TImage';
import TText from '../components/ui/TText';
import TView from '../components/ui/TView';
import Icons from '../components/ui/vector-icons';
import {api} from '../libs/api';
import {signOut, useFirebaseAuth} from '../libs/firebase';
import {ldbValues} from '../libs/localDB';
import tw from '../libs/tailwind';
import {getMS} from '../libs/utils/helpers';
import {router} from '../navigation/navigator';

export default function ProfileScreen() {
  const {user} = useFirebaseAuth();
  const userId = ldbValues.getUserId();

  const {data, ...bookmarkReq} = useQuery({
    queryKey: ['user-bookmarks', userId],
    queryFn: () => api.get(`/bookmark/list?userId=${userId}`),
    select(data) {
      return data.data;
    },
    staleTime: getMS.minute(1),
  });

  useFocusEffect(
    useCallback(() => {
      bookmarkReq.refetch();
    }, []),
  );

  const [selected, setSelected] = useState('Watch Later');
  const selectedList = useMemo(() => {
    let separated = {
      all: [],
      movieList: [],
      tvList: [],
    };
    if (data) {
      let all = data.result.list.find((x: any) => x.name === selected);
      let movieList = all?.items?.filter(
        (x: any) => x?.contentKind === 'movie',
      );
      let tvList = all?.items?.filter((x: any) => x?.contentKind === 'tv');
      separated = {
        all,
        movieList,
        tvList,
      };
    }
    return separated;
  }, [data, selected]);

  const categoryItemRender = useCallback(
    x => {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelected(x.name);
          }}
          style={tw.style(
            selected === x.name && ` border-b-4 pb-1 border-primary `,
          )}
          key={x._id}>
          <TView style={tw`mx-auto bg-primary rounded-full p-2`}>
            {x.name === 'Favorite' && (
              <Icons.Feather size={30} color={'white'} name={'heart'} />
            )}
            {x.name === 'Watch Later' && (
              <Icons.Feather size={30} color={'white'} name={'watch'} />
            )}
            {x.name === 'Watched' && (
              <Icons.Feather size={30} color={'white'} name={'eye'} />
            )}
            {x.items.length >= 0 && (
              <TView
                style={tw` m-auto h-5 w-5 absolute left-10 bottom-8 bg-rose-400 rounded-full  justify-center items-center `}>
                <TText style={tw`text-white `}>{x?.items?.length}</TText>
              </TView>
            )}
          </TView>
          <TText>{x.name}</TText>
        </TouchableOpacity>
      );
    },
    [selected],
  );

  const renderMovie = useCallback(({item, index}: any) => {
    return <MovieCard data={item.content} />;
  }, []);
  const renderTV = useCallback(({item, index}: any) => {
    return <SeriesCard data={item.content} />;
  }, []);

  const [activeSubTab, setActiveSubTab] = useState('movie');

  const subTabItems = useMemo(
    () => [
      {
        label: `Movies (${selectedList.movieList.length})`,
        value: 'movie',
      },
      {
        label: `TV Series (${selectedList.tvList.length})`,
        value: 'tv',
      },
    ],
    [selectedList],
  );

  // rendering
  if (!user) return;
  return (
    <View style={tw`mx-2 flex-1`}>
      <TView style={tw`justify-between flex-row items-center mb-5`}>
        <TText style={tw`text-black font-bold text-xl`}>My Profile</TText>
        <Icons.Feather
          onPress={() => {
            Alert.alert(
              'Logout confirmation',
              'All your information and list saved in cloud. \nDo you want to logout ?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                  onPress: () => {},
                },
                {
                  text: 'Logout',
                  style: 'default',
                  onPress: () => {
                    signOut().then(() => {
                      router.navigate('onboarding');
                    });
                  },
                },
              ],
            );
          }}
          style={tw`p-2 rounded-full border m-2 border-primary text-primary ml-auto h-10 w-10`}
          size={25}
          name="log-out"
        />
      </TView>
      <TView style={tw`flex-row gap-5 justify-start items-center`}>
        <TImage
          source={{
            uri:
              user.photoURL ??
              Image.resolveAssetSource(require('../assets/images/avatar.webp'))
                .uri,
          }}
          style={tw`h-28 w-24 rounded-3xl`}
        />
        <TView>
          <TText style={tw`text-lg font-bold`}>{user.displayName}</TText>
          <TText style={tw`text-base`}>{user.email}</TText>
          <TText style={tw`text-base`}>{user.emailVerified}</TText>
        </TView>
      </TView>

      {bookmarkReq.status === 'success' && (
        <TView style={tw`mt-5 flex-1`}>
          <TView style={tw`flex-row flex-wrap  justify-center gap-10`}>
            {data.result.list.map(categoryItemRender)}
          </TView>

          <TabGroupButtons
            containerStyle={tw`mx-auto mt-5`}
            tabItems={subTabItems}
            activeItem={activeSubTab}
            onChange={v => {
              setActiveSubTab(v);
            }}
          />
          <FlatList
            data={
              activeSubTab == 'movie'
                ? selectedList.movieList
                : activeSubTab == 'tv'
                ? selectedList.tvList
                : []
            }
            numColumns={3}
            contentContainerStyle={tw`gap-2`}
            columnWrapperStyle={tw`gap-2 justify-center`}
            renderItem={
              activeSubTab === 'movie'
                ? renderMovie
                : activeSubTab == 'tv'
                ? renderTV
                : null
            }
          />
        </TView>
      )}
    </View>
  );
}
