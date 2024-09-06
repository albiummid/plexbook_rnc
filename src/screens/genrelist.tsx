import React, {useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import ContentSkelton from '../components/content/card/content-skelton';
import MovieCard from '../components/content/card/movie-card';
import SeriesCard from '../components/content/card/series-card';
import Section from '../components/Section';
import TabGroupButtons from '../components/ui/TabGroupButtons';
import {ldb} from '../libs/localDB';
import {ScreenProps} from '../libs/navigation/Screens';
import tw from '../libs/tailwind';
import {
  getGenreNameById,
  useDiscoverMovie,
  useDiscoverSeries,
} from '../libs/tmdb';
import {ISO6391LanguageCode} from '../types/static.types';

export default function GenreList(props: ScreenProps<'genre_list'>) {
  const {languageList} = ldb.getObject('onboarding');

  const [activeLanguage, setActiveLanguage] = useState(
    languageList[0].value.iso_639_1,
  );

  const {id, contentKind} = props.route.params;
  const {data: seriesList, ...seriesReq} = useDiscoverSeries(
    {
      with_original_language: activeLanguage as ISO6391LanguageCode,
      with_genres: id,
    },
    contentKind === 'tv',
  );
  const {data: movieList, ...movieReq} = useDiscoverMovie(
    {
      with_original_language: activeLanguage as ISO6391LanguageCode,
      with_genres: id,
    },
    contentKind === 'movie',
  );

  const isLoading =
    contentKind == 'movie' ? movieReq.isLoading : seriesReq.isLoading;

  const tabListItem = useMemo(
    () =>
      languageList.map((x: any) => ({
        label: `${x.label}`,
        value: x.value.iso_639_1,
      })),
    [],
  );

  return (
    <Section style={tw`bg-black`} label={getGenreNameById(id)}>
      <TabGroupButtons
        containerStyle={tw` mx-auto mb-5`}
        textStyle={tw`text-white`}
        activeItem={activeLanguage}
        onChange={v => setActiveLanguage(v as ISO6391LanguageCode)}
        tabItems={tabListItem}
      />
      {isLoading ? (
        <FlatList
          numColumns={3}
          data={[...Array(20).keys()]}
          columnWrapperStyle={tw`gap-x-5`}
          contentContainerStyle={tw`gap-y-5 justify-center items-center`}
          renderItem={({item}) => <ContentSkelton />}
        />
      ) : (
        <FlatList
          numColumns={3}
          data={
            contentKind === 'movie' ? movieList.results : seriesList.results
          }
          columnWrapperStyle={tw`gap-x-5`}
          contentContainerStyle={tw`gap-y-5 justify-center items-center`}
          renderItem={({item}) =>
            contentKind === 'movie' ? (
              <MovieCard style={tw``} data={item} />
            ) : contentKind === 'tv' ? (
              <SeriesCard style={tw``} data={item} />
            ) : null
          }
        />
      )}
    </Section>
  );
}
