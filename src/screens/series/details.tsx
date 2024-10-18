import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ArtistList from '../../components/ArtistList';
import ContentActionBar from '../../components/content/action-bar';
import GenreSection from '../../components/content/section/GenreSection';
import SeasonSection from '../../components/content/section/SeasonSection';
import TrailerSection from '../../components/content/section/TrailerSection';
import ContentImageList from '../../components/ContentImageList';
import Header from '../../components/layout/Header';
import RecommendedList from '../../components/RecommendedList';
import StoryLine from '../../components/StoryLine';
import Fallback from '../../components/ui/ScreenFallback';
import TScrollView from '../../components/ui/TScrollView';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import Icons from '../../components/ui/vector-icons';
import {ScreenProps} from '../../libs/navigation/Screens';
import tw from '../../libs/tailwind';
import {
  getBackdropImageURL,
  getContentDetailsById,
  getPosterImageURL,
  tmdbGET,
} from '../../libs/tmdb';
import {TSeriesDetails} from '../../types/contents/series.types';
import Ratings from '../../components/content/Ratings';
import DetailsHero from '../../components/content/DetailsHero';

export default function SeriesDetailScreen({
  route,
}: ScreenProps<'series_details'>) {
  const {id} = route.params;
  const {data: details, ...detailsReq} = useQuery({
    queryKey: ['movie-details', id],
    queryFn: async () => {
      const {data} = await getContentDetailsById('tv', id);
      return data as TSeriesDetails;
    },
  });

  if (!details)
    return (
      <Fallback isLoading={detailsReq.isLoading} error={detailsReq.isError} />
    );

  return (
    <TScrollView style={tw`bg-black`}>
      <DetailsHero contentKind="tv" details={details} id={id} />
      <View style={tw`px-2`}>
        {/* Season */}
        <SeasonSection data={details} />

        {/* Trailer section */}
        <TrailerSection contentId={id} contentKind="tv" />

        {/* Top Cast */}
        <ArtistList id={id} contentKind={'tv'} />
        {/* Collection */}

        {/* Content Info */}

        {/* <MovieInfo data={details} isLoading={detailsReq.isLoading} /> */}

        {/* Image list */}
        <ContentImageList id={id} contentKind={'tv'} label={details.name} />
        {/* Recommended List */}
        <RecommendedList contentId={id} contentKind="tv" />
      </View>
    </TScrollView>
  );
}
