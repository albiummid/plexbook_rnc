import React, {useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import ContentSkelton from '../components/content/card/content-skelton';
import MovieCard from '../components/content/card/movie-card';
import SeriesCard from '../components/content/card/series-card';
import Section from '../components/Section';
import TabGroupButtons from '../components/ui/TabGroupButtons';
import {languageList} from '../constants/emums';
import {ScreenProps} from '../libs/navigation/Screens';
import tw from '../libs/tailwind';
import {
  getGenreNameById,
  useDiscoverMovie,
  useDiscoverSeries,
} from '../libs/tmdb';
import {FlashList} from '@shopify/flash-list';

export default function GenreList(props: ScreenProps<'genre_list'>) {
  const [activeLanguage, setActiveLanguage] = useState(
    languageList.find(x => x.name === 'English')?.iso_639_1,
  );
  const {id, contentKind} = props.route.params;
  const {data: seriesList, ...seriesReq} = useDiscoverSeries(
    {
      with_original_language: activeLanguage as any,
      with_genres: id,
    },
    contentKind === 'tv',
  );
  const {data: movieList, ...movieReq} = useDiscoverMovie(
    {
      with_original_language: activeLanguage as any,
      with_genres: id,
    },
    contentKind === 'movie',
  );

  const isLoading =
    contentKind == 'movie' ? movieReq.isLoading : seriesReq.isLoading;

  const tabListItem = useMemo(
    () =>
      languageList.map((x: any, i) => ({
        label: `${x.name} ${
          i !== 0 ? `(${x.english_name.toLowerCase()})` : ''
        }`,
        value: x.iso_639_1,
      })),
    [],
  );

  return (
    <Section style={tw`bg-black `} label={getGenreNameById(id)}>
      <TabGroupButtons
        containerStyle={tw` mx-auto mb-5`}
        textStyle={tw`text-white`}
        activeItem={activeLanguage as any}
        onChange={v => setActiveLanguage(v as any)}
        tabItems={tabListItem}
      />
      {isLoading ? (
        <FlatList
          numColumns={3}
          style={tw`mx-auto`}
          data={[...Array(20).keys()]}
          columnWrapperStyle={tw`gap-x-3`}
          contentContainerStyle={tw`gap-y-3 justify-center items-center`}
          renderItem={({item}) => <ContentSkelton />}
        />
      ) : (
        <FlashList
          numColumns={3}
          data={
            contentKind === 'movie' ? movieList.results : seriesList.results
          }
          estimatedItemSize={40}
          contentContainerStyle={tw``}
          renderItem={({item, index}: {item: any; index: number}) => {
            return (
              <View style={tw``}>
                {contentKind === 'movie' ? (
                  <MovieCard
                    contentId={item.id}
                    style={tw` w-24`}
                    data={item}
                  />
                ) : contentKind === 'tv' ? (
                  <SeriesCard
                    contentId={item.id}
                    style={tw`w-24`}
                    data={item}
                  />
                ) : null}
              </View>
            );
          }}
        />
      )}
    </Section>
  );
}
