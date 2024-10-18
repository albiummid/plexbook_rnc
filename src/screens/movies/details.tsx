import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ArtistList from '../../components/ArtistList';
import CollectionList from '../../components/CollectionList';
import ContentActionBar from '../../components/content/action-bar';
import Ratings from '../../components/content/Ratings';
import GenreSection from '../../components/content/section/GenreSection';
import TrailerSection from '../../components/content/section/TrailerSection';
import ContentImageList from '../../components/ContentImageList';
import {MovieInfo} from '../../components/ContentInfo';
import Header from '../../components/layout/Header';
import RecommendedList from '../../components/RecommendedList';
import StoryLine from '../../components/StoryLine';
import Fallback from '../../components/ui/ScreenFallback';
import TScrollView from '../../components/ui/TScrollView';
import {ScreenProps} from '../../libs/navigation/Screens';
import tw from '../../libs/tailwind';
import {getBackdropImageURL, getContentDetailsById} from '../../libs/tmdb';
import {TMovieDetails} from '../../types/contents/movie.types';
import DetailsHero from '../../components/content/DetailsHero';

export default function MovieDetailScreen({
  route,
}: ScreenProps<'movie_details'>) {
  const {id} = route.params;
  const {data: details, ...detailsReq} = useQuery({
    queryKey: ['movie-details', id],
    queryFn: async () => {
      const {data} = await getContentDetailsById('movie', id);
      return data as TMovieDetails;
    },
  });

  if (!details)
    return (
      <Fallback isLoading={detailsReq.isLoading} error={detailsReq.error} />
    );

  return (
    <TScrollView style={tw`bg-black`}>
      <DetailsHero contentKind="movie" details={details} id={id} />
      <View style={tw`px-2`}>
        {/* Trailer section */}
        <TrailerSection contentId={id} contentKind="movie" />
        {/* Collection */}
        {details?.belongs_to_collection && (
          <CollectionList
            collectionId={details?.belongs_to_collection?.id}
            id={id}
          />
        )}
        {/* Top Cast */}
        <ArtistList id={id} contentKind={'movie'} />

        {/* Recommended List */}
        <RecommendedList contentId={id} contentKind="movie" />

        {/* Image list */}
        <ContentImageList id={id} contentKind={'movie'} label={details.title} />

        {/* Content Info */}

        <MovieInfo data={details} isLoading={detailsReq.isLoading} />
      </View>
    </TScrollView>
  );
}
