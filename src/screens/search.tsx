import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';
import Section from '../components/Section';
import TabGroupButtons from '../components/ui/TabGroupButtons';
import TImage from '../components/ui/TImage';
import TText from '../components/ui/TText';
import TView from '../components/ui/TView';
import Icons from '../components/ui/vector-icons';
import {router} from '../libs/navigation/navigator';
import tw from '../libs/tailwind';
import {
  getGenreList,
  getPosterImageURL,
  getProfileImageURL,
  useContentSearch,
} from '../libs/tmdb';
import moment from 'moment';
import MovieCard from '../components/content/card/movie-card';
import SeriesCard from '../components/content/card/series-card';
import {FlatList} from 'react-native-actions-sheet';
import {useFocusEffect} from '@react-navigation/native';
import {openSheet, sheetIds} from '../components/sheets/ActionSheet';
import CardActionBar from '../components/content/card/card-action';

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [textInput, setTextInput] = useState('');
  const ref = useRef<any>(null);

  const [activeTab, setActiveTab] = useState<
    'movie' | 'tv' | 'person' | 'collection'
  >('movie');

  const {flattenedData: iData, ...iReq} = useContentSearch({
    contentKind: activeTab,
    query: keyword,
  });

  const debounce = useDebouncedCallback(v => {
    setKeyword(v);
  }, 600);

  useFocusEffect(
    useCallback(() => {
      ref.current.focus();
    }, []),
  );

  return (
    <Section label="Search" style={tw`bg-black`}>
      <TabGroupButtons
        containerStyle={tw`mx-auto `}
        textStyle={tw`text-white`}
        tabItems={[
          {
            label: `Movie`,
            value: 'movie',
          },
          {
            label: 'Collection',
            value: 'collection',
          },
          {
            label: `Series`,
            value: 'tv',
          },
          {
            label: `Person`,
            value: 'person',
          },
        ]}
        activeItem={activeTab}
        onChange={e => {
          setActiveTab(e as any);
        }}
      />
      <TView style={tw`relative border border-primary rounded-lg m-2`}>
        <TextInput
          onChangeText={t => {
            debounce(t);
            setTextInput(t);
          }}
          ref={ref}
          value={textInput}
          style={tw` py-1 px-4 text-white`}
          placeholderTextColor={'white'}
          placeholder={`Type any ${activeTab} name`}
        />
        {keyword.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              ref.current.clear();
              setKeyword('');
              setTextInput('');
              // Keyboard.dismiss();
            }}
            style={tw` absolute border-primary right-2 top-2 p-1 justify-center items-center border rounded-full m-auto`}>
            <Icons.AntDesign size={10} name="close" style={tw` text-primary`} />
          </TouchableOpacity>
        )}
      </TView>
      {keyword.length === 0 && (
        <TText style={tw`text-center mt-10 text-white`}>
          You haven't search anything yet !
        </TText>
      )}
      {iReq.isSuccess && keyword.length > 0 && iData?.length === 0 && (
        <TText style={tw`text-center mt-10 text-white`}>
          Nothing found with this keyword...
        </TText>
      )}
      {activeTab === 'collection' ? (
        <FlatList
          data={iData}
          numColumns={3}
          renderItem={({item, index}) => {
            return <ContentCard contentKind={activeTab} item={item} />;
          }}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (iReq.hasNextPage) {
              iReq.fetchNextPage();
            }
          }}
          ListFooterComponent={() => {
            if (iReq.isFetchingNextPage) {
              return <ActivityIndicator style={tw`mt-5`} size={30} />;
            }
            return null;
          }}
        />
      ) : (
        <FlashList
          data={iData}
          estimatedItemSize={12}
          renderItem={({item, index}) => {
            return <ContentCard contentKind={activeTab} item={item} />;
          }}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (iReq.hasNextPage) {
              iReq.fetchNextPage();
            }
          }}
          ListFooterComponent={() => {
            if (iReq.isFetchingNextPage) {
              return <ActivityIndicator style={tw`mt-5`} size={30} />;
            }
            return null;
          }}
        />
      )}
    </Section>
  );
}

const ContentCard = ({item, contentKind}: {item: any; contentKind: string}) => {
  const imageURI =
    contentKind === 'person'
      ? getProfileImageURL(item?.profile_path, 'w185')
      : getPosterImageURL(item?.poster_path, 'w185');
  const label = contentKind === 'movie' ? item?.title : item?.name;
  const onPress = () => {
    router.push(
      contentKind === 'movie'
        ? 'movie_details'
        : contentKind === 'tv'
        ? 'series_details'
        : contentKind === 'person'
        ? 'person_details'
        : 'collection_details',
      {id: item.id},
    );
  };
  if (['movie', 'tv'].includes(contentKind)) {
    // For movie / series
    return (
      <View
        style={tw`m-2 rounded-lg flex-row gap-x-2 border-b border-primary pb-3`}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <TImage
            source={{uri: imageURI}}
            style={tw`h-36 w-24 rounded-lg border border-primary `}
          />
          <TView
            stack="hStack"
            gapX={1}
            alignItems="center"
            style={tw`bg-black/80 absolute bottom-0 w-full flex-row justify-around p-1`}>
            <TView stack="hStack" gap={1} alignItems="center">
              <Icons.AntDesign style={tw`text-primary`} name="star" />
              <TText style={tw`text-white text-xs`}>
                {Number(item?.vote_average).toFixed(1)}
              </TText>
            </TView>
            <Icons.Entypo name="dot-single" color={'white'} />
            <TText style={tw`text-white text-xs`}>
              {moment(
                contentKind === 'movie'
                  ? item.release_date
                  : item.first_air_date,
              ).format('YYYY')}
            </TText>
          </TView>
        </TouchableOpacity>
        <View style={tw`flex-1 gap-1`}>
          <>
            <TText style={tw`text-white pr-2 font-bold `}>{label}</TText>
            <CardActionBar data={item} contentKind={contentKind} id={item.id} />
            {/* Genre list */}
            <View style={tw` flex-row  flex-wrap`}>
              {getGenreList(item.genre_ids).map((x, i) => (
                <TouchableOpacity
                  onPress={() => {
                    router.push('genre_list', {id: x.id, contentKind});
                  }}
                  activeOpacity={0.5}
                  key={x.id}>
                  <Text
                    style={tw.style(
                      `text-primary  text-xs `,
                      i == 0 ? '' : '',
                    )}>
                    {i !== 0 && ' | '}
                    {x.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Rating and release  */}

            <TText style={tw`text-xs text-gray-200 pr-2 `} numberOfLines={3}>
              {item.overview}
            </TText>
          </>
        </View>
      </View>
    );
  }

  if (contentKind === 'person') {
    return (
      <View style={tw`m-2 gap-2 border border-primary p-2 rounded-lg `}>
        <View style={tw`absolute right-2`}>
          <CardActionBar data={item} contentKind={contentKind} id={item.id} />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={tw`gap-1 mx-auto items-center`}>
          <TImage source={{uri: imageURI}} style={tw`h-24 w-16 rounded-lg `} />

          <TText style={tw`text-white pr-2 font-bold text-center `}>
            {label}
          </TText>
        </TouchableOpacity>
        <View style={tw`flex-1 gap-1`}>
          <View style={tw`flex-row justify-around`}>
            {item.known_for?.map((x: any, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  router.push(
                    x.media_type === 'movie'
                      ? 'movie_details'
                      : 'series_details',
                    {id: x.id},
                  );
                }}>
                <TImage
                  source={{
                    uri: getPosterImageURL(x.poster_path, 'w185'),
                  }}
                  style={tw`w-20 h-30 rounded-lg border border-primary`}
                />
                <View style={tw`flex-1 w-20`}>
                  <Text style={tw`text-white`} numberOfLines={1}>
                    {x.media_type === 'movie' ? x.title : x.name}
                  </Text>
                  <TView
                    stack="hStack"
                    gapX={1}
                    alignItems="center"
                    style={tw`flex-row `}>
                    <TView stack="hStack" gap={1} alignItems="center">
                      <Icons.AntDesign style={tw`text-primary`} name="star" />
                      <TText style={tw`text-white text-xs`}>
                        {Number(x?.vote_average).toFixed(1)}
                      </TText>
                    </TView>
                    <Icons.Entypo name="dot-single" color={'white'} />
                    <TText style={tw`text-white text-xs`}>
                      {moment(
                        x.media_type === 'movie'
                          ? x.release_date
                          : x.first_air_date,
                      ).format('YYYY')}
                    </TText>
                  </TView>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }

  if (contentKind === 'collection') {
    return (
      <TouchableOpacity
        style={tw`flex-1 mx-auto mb-5`}
        activeOpacity={0.8}
        onPress={onPress}>
        <TImage
          source={{uri: imageURI}}
          style={tw`h-36 w-24 rounded-lg mx-auto mb-2 `}
        />
        <TText style={tw`text-white text-center pr-2  `}>{label}</TText>
      </TouchableOpacity>
    );
  }
};
