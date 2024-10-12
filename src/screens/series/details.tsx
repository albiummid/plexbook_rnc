import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import React from 'react';
import {Image, ImageBackground} from 'react-native';
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
} from '../../libs/tmdb';
import {TSeriesDetails} from '../../types/contents/series.types';

export default function SeriesDetailScreen({
  route,
}: ScreenProps<'series_details'>) {
  const {id, data} = route.params;
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
      <ImageBackground
        blurRadius={1}
        source={{
          uri: getBackdropImageURL(details.backdrop_path as string, 'w300'),
        }}>
        <Header textStyle={tw`text-white text-base`} />
        <LinearGradient
          style={tw`absolute bottom-0 w-full h-80`}
          colors={['transparent', 'black']}
          start={{x: 0, y: 0.5}}
          end={{x: 0, y: 1}}
        />
        <TView
          stack="hStack"
          alignItems="end"
          justifyContent="center"
          style={tw` mt-5 mx-2 `}>
          <TView gapY={1} style={tw` flex-1`}>
            {/* Poster side intro */}
            <TText style={tw`text-white font-bold text-xl`}>
              {details?.name}
            </TText>
            {/*  */}
            {/* <Ratings imdbId={details.}/> */}

            <TView stack="hStack" gapX={1} alignItems="center">
              <TView stack="hStack" gap={1} alignItems="center">
                <Icons.AntDesign style={tw`text-primary`} name="star" />
                <TText style={tw`text-white text-xs`}>
                  {Number(details?.vote_average).toFixed(1)}
                </TText>
              </TView>
              <Icons.Entypo name="dot-single" color={'white'} />
              <TText style={tw`text-white text-xs`}>
                {moment(details?.first_air_date).format('MMMM YYYY')}
              </TText>
            </TView>
            <ContentActionBar
              data={details}
              style={tw`mt-1`}
              contentKind={'tv'}
              id={id}
            />
          </TView>
          <Image
            style={tw`h-48 w-32 rounded-lg border-2 border-primary`}
            source={{uri: getPosterImageURL(details?.poster_path, 'w185')}}
          />
        </TView>
      </ImageBackground>
      {/* Genre */}
      <GenreSection genres={details.genres} contentKind="tv" />

      {/* Story Line */}
      <StoryLine story={details?.overview} />

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
      <ContentImageList id={id} contentKind={'tv'} />
      {/* Recommended List */}
      <RecommendedList contentId={id} contentKind="tv" />
    </TScrollView>
  );
}
