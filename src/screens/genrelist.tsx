import React, {useState} from 'react';
import {FlatList} from 'react-native';
import ContentSkelton from '../components/content/card/content-skelton';
import SeriesCard from '../components/content/card/series-card';
import Section from '../components/Section';
import TabGroupButtons from '../components/ui/TabGroupButtons';
import TText from '../components/ui/TText';
import tw from '../libs/tailwind';
import {getGenreNameById, useDiscoverSeries} from '../libs/tmdb';
import {ScreenProps} from '../navigation/Screens';
import {TSeriesListItem} from '../types/contents/series.types';
import {ISO6391LanguageCode} from '../types/static.types';

export default function GenreList(props: ScreenProps<'genre_list'>) {
  const [activeLanguage, setActiveLanguage] =
    useState<ISO6391LanguageCode>('en');
  const languageList: {
    code: ISO6391LanguageCode;
    name: string;
  }[] = [
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'bn',
      name: 'Bangla',
    },
    {
      code: 'hi',
      name: 'Hindi',
    },
  ];

  const {id, contentKind} = props.route.params;
  const {data, ...req} = useDiscoverSeries(
    {
      with_original_language: activeLanguage,
    },
    contentKind === 'tv',
  );
  return (
    <Section label={getGenreNameById(id)}>
      <TabGroupButtons
        containerStyle={tw` mx-auto `}
        activeItem={activeLanguage}
        onChange={v => setActiveLanguage(v as ISO6391LanguageCode)}
        tabItems={languageList.map(x => ({label: x.name, value: x.code}))}
      />
      {req.isLoading ? (
        <FlatList
          numColumns={3}
          data={[...Array(20).keys()]}
          columnWrapperStyle={tw`gap-x-5`}
          contentContainerStyle={tw`gap-y-5 justify-center items-center`}
          renderItem={({item}) => <ContentSkelton />}
        />
      ) : req.isSuccess ? (
        <FlatList
          numColumns={3}
          data={data?.results as TSeriesListItem[]}
          columnWrapperStyle={tw`gap-x-5`}
          contentContainerStyle={tw`gap-y-5 justify-center items-center`}
          renderItem={({item}) => <SeriesCard style={tw``} data={item} />}
        />
      ) : (
        req.isError && (
          <>
            <TText>
              Something went wrong... \n check your internet connection
            </TText>
          </>
        )
      )}
    </Section>
  );
}
