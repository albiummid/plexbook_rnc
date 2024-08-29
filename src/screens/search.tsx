import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, TextInput, TouchableOpacity} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';
import MovieCard from '../components/content/card/movie-card';
import PersonCard from '../components/content/card/PersonCard';
import SeriesCard from '../components/content/card/series-card';
import Section from '../components/Section';
import TabGroupButtons from '../components/ui/TabGroupButtons';
import TView from '../components/ui/TView';
import Icons from '../components/ui/vector-icons';
import tw from '../lib/tailwind';
import {useMultiSearch} from '../lib/tmdb';
import {TMultiSearchItem} from '../types/contents/content.types';
import {TMovieListItem} from '../types/contents/movie.types';
import {TSeriesListItem} from '../types/contents/series.types';

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const ref = useRef<any>(null);

  const {data, ...req} = useMultiSearch(keyword);
  useFocusEffect(
    useCallback(() => {
      ref.current?.focus();
    }, []),
  );
  const debounce = useDebouncedCallback(v => {
    setKeyword(v);
  }, 400);

  const [result, setResult] = useState<{
    movie: TMultiSearchItem[];
    series: TMultiSearchItem[];
    person: TMultiSearchItem[];
  }>({
    movie: [],
    series: [],
    person: [],
  });

  useEffect(() => {
    let movie: TMultiSearchItem[] = [];
    let series: TMultiSearchItem[] = [];
    let person: TMultiSearchItem[] = [];
    data?.results?.forEach(x => {
      if (x.media_type === 'movie') {
        movie.push(x);
      } else if (x.media_type === 'tv') {
        series.push(x);
      } else {
        person.push(x);
      }
    });
    setResult({movie, series, person});
  }, [data?.results]);

  const [activeTab, setActiveTab] = useState('movie');
  const renderTab = keyword.length > 0 && data && (
    <>
      <TabGroupButtons
        containerStyle={tw`mx-auto mt-5`}
        tabItems={[
          {
            label: `Movie (${result.movie.length})`,
            value: 'movie',
          },
          {
            label: `Series (${result.series.length})`,
            value: 'series',
          },
          {
            label: `Person (${result.person.length})`,
            value: 'person',
          },
        ]}
        activeItem={activeTab}
        onChange={e => setActiveTab(e)}
      />
    </>
  );
  return (
    <Section label="Search">
      <TView style={tw`relative border border-primary rounded-lg m-2`}>
        <TextInput
          onChangeText={t => debounce(t)}
          ref={ref}
          autoFocus
          style={tw`    py-2 px-4`}
          placeholder=" Movie / Series / Artist , Search anything..."
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
      <>{renderTab}</>
      <FlatList
        data={
          activeTab === 'movie'
            ? result.movie
            : activeTab === 'series'
            ? result.series
            : result.person
        }
        numColumns={3}
        style={tw`mx-auto`}
        columnWrapperStyle={tw`gap-x-2 `}
        contentContainerStyle={tw`gap-y-2  items-start `}
        renderItem={({item}) => (
          <>
            {item.media_type === 'movie' ? (
              <MovieCard data={item as TMovieListItem} />
            ) : item.media_type === 'tv' ? (
              <SeriesCard data={item as TSeriesListItem} />
            ) : (
              <PersonCard data={item} />
            )}
          </>
        )}
      />
    </Section>
  );
}
