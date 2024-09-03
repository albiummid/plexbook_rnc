import React, {useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';
import MovieCard from '../components/content/card/movie-card';
import PersonCard from '../components/content/card/PersonCard';
import SeriesCard from '../components/content/card/series-card';
import Section from '../components/Section';
import TabGroupButtons from '../components/ui/TabGroupButtons';
import TText from '../components/ui/TText';
import TView from '../components/ui/TView';
import Icons from '../components/ui/vector-icons';
import tw from '../libs/tailwind';
import {useContentSearch} from '../libs/tmdb';
import {TMovieListItem} from '../types/contents/movie.types';
import {TSeriesListItem} from '../types/contents/series.types';

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [textInput, setTextInput] = useState('');
  const ref = useRef<any>(null);

  const [activeTab, setActiveTab] = useState<'movie' | 'tv' | 'person'>(
    'movie',
  );

  const {data: iData, ...iReq} = useContentSearch({
    contentKind: activeTab,
    query: keyword,
  });
  // useFocusEffect(
  //   useCallback(() => {
  //     ref.current?.focus();
  //   }, []),
  // );
  const debounce = useDebouncedCallback(v => {
    setKeyword(v);
  }, 600);

  const tabItems = useMemo(
    () => [
      {
        label: `Movie`,
        value: 'movie',
      },
      {
        label: `Series`,
        value: 'tv',
      },
      {
        label: `Person`,
        value: 'person',
      },
    ],
    [],
  );
  const loadMore = () => {
    iReq.fetchNextPage();
    if (iReq.hasNextPage) {
    }
  };

  return (
    <Section
      label="Search"
      style={tw`bg-black`}
      rightSection={
        <TabGroupButtons
          containerStyle={tw`mx-auto `}
          textStyle={tw`text-white`}
          tabItems={tabItems.map(x => ({label: x.label, value: x.value}))}
          activeItem={activeTab}
          onChange={e => setActiveTab(e)}
        />
      }>
      <TView style={tw`relative border border-primary rounded-lg m-2`}>
        <TextInput
          onChangeText={t => {
            debounce(t);
            setTextInput(t);
          }}
          ref={ref}
          value={textInput}
          style={tw` py-2 px-4 text-white`}
          placeholderTextColor={'white'}
          placeholder={`Type any ${activeTab} name`}
        />
        {keyword.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              ref.current.clear();
              setKeyword('');
            }}
            style={tw` absolute border-primary right-2 top-2 p-1 justify-center items-center border rounded-full m-auto`}>
            <Icons.AntDesign size={15} name="close" style={tw` text-primary`} />
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
      <FlatList
        data={iData}
        numColumns={3}
        style={tw`mx-2`}
        onEndReachedThreshold={0.1}
        // columnWrapperStyle={tw`gap-x-5 `}
        contentContainerStyle={tw`gap-y-5 `}
        renderItem={({item, index}) => {
          return (
            <>
              {activeTab === 'movie' ? (
                <MovieCard style={tw` m-auto`} data={item as TMovieListItem} />
              ) : activeTab === 'tv' ? (
                <SeriesCard
                  style={tw` m-auto`}
                  data={item as TSeriesListItem}
                />
              ) : (
                <PersonCard style={tw` m-auto`} data={item} />
              )}
            </>
          );
        }}
        // onEndReachedThreshold={0.5}
        onEndReached={() => {
          loadMore();
        }}
        ListFooterComponent={() => {
          if (iReq.isRefetching) {
            return <ActivityIndicator size={30} />;
          }
          return null;
        }}
      />
    </Section>
  );
}
