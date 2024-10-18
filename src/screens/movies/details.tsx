import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import React from 'react';
import {Image, ImageBackground} from 'react-native';
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
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import Icons from '../../components/ui/vector-icons';
import {ScreenProps} from '../../libs/navigation/Screens';
import tw from '../../libs/tailwind';
import {
  getBackdropImageURL,
  getContentDetailsById,
  getDuration,
  getPosterImageURL,
} from '../../libs/tmdb';
import {TMovieDetails} from '../../types/contents/movie.types';
import ToggleButton from '../../components/ui/ToggleButton';

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
      <ImageBackground
        blurRadius={1}
        source={{uri: getBackdropImageURL(details?.backdrop_path, 'w300')}}>
        <Header textStyle={tw`text-white text-base`} />
        <LinearGradient
          style={tw`absolute bottom-0 w-full h-full`}
          colors={['transparent', 'black']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        />
        <TView stack="hStack" alignItems="end" style={tw`mx-2 gap-4 `}>
          <TView style={tw`flex-1 gap-y-2`}>
            {/* Poster side intro */}
            <TText style={tw`text-white font-bold text-xl`}>
              {details?.title}
            </TText>
            {/*  */}
            {details.status === 'Released' ? (
              <Ratings imdbId={details.imdb_id} />
            ) : (
              <ToggleButton textStyle={tw`text-xs`}>Unreleased</ToggleButton>
            )}

            <TView stack="hStack" gapX={1} alignItems="center">
              {details.status === 'Released' && (
                <TView stack="hStack" gap={1} alignItems="center">
                  <Icons.AntDesign style={tw`text-primary`} name="star" />
                  <TText style={tw`text-white text-xs`}>
                    {Number(details?.vote_average).toFixed(1)}
                  </TText>
                  <Icons.Entypo name="dot-single" color={'white'} />
                </TView>
              )}

              {detailsReq.isSuccess && (
                <>
                  <TText style={tw`text-white text-xs`}>
                    {getDuration(details?.runtime)}
                  </TText>
                </>
              )}
              <Icons.Entypo name="dot-single" color={'white'} />
              <TText style={tw`text-white text-xs`}>
                {moment(details?.release_date).format('YYYY')}
              </TText>
            </TView>
            {/* Genre */}
            <ContentActionBar
              data={details}
              style={tw`mt-1`}
              contentKind={'movie'}
              id={id}
            />
          </TView>
          <Image
            style={tw`h-48 w-32 rounded-lg border-2 border-primary`}
            source={{uri: getPosterImageURL(details?.poster_path, 'w154')}}
          />
        </TView>
      </ImageBackground>
      <GenreSection genres={details?.genres} contentKind="movie" />

      {/* Story Line */}
      <StoryLine story={details?.overview ?? details?.overview} />

      {/* Trailer section */}
      <TrailerSection contentId={id} contentKind="movie" />

      {/* Top Cast */}
      <ArtistList id={id} contentKind={'movie'} />
      {/* Collection */}
      {details?.belongs_to_collection && (
        <CollectionList
          collectionId={details?.belongs_to_collection?.id}
          id={id}
        />
      )}

      {/* Image list */}
      <ContentImageList id={id} contentKind={'movie'} label={details.title} />

      {/* Content Info */}

      <MovieInfo data={details} isLoading={detailsReq.isLoading} />

      {/* Recommended List */}
      <RecommendedList contentId={id} contentKind="movie" />
    </TScrollView>
  );
}
