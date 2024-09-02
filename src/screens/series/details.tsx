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
import Section from '../../components/Section';
import TScrollView from '../../components/ui/TScrollView';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import Icons from '../../components/ui/vector-icons';
import tw from '../../libs/tailwind';
import {getContentDetailsById, getDuration, getImageURL} from '../../libs/tmdb';
import {ScreenProps} from '../../navigation/Screens';
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

  return (
    <TScrollView style={tw`bg-black`}>
      <ImageBackground
        blurRadius={2}
        source={{uri: getImageURL(data.backdrop_path)}}>
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
            <TText style={tw`text-white font-bold text-xl`}>{data.name}</TText>
            {/*  */}

            <TView stack="hStack" gapX={1} alignItems="center">
              <TView stack="hStack" gap={1} alignItems="center">
                <Icons.AntDesign style={tw`text-primary`} name="star" />
                <TText style={tw`text-white text-xs`}>
                  {Number(data.vote_average).toFixed(1)}
                </TText>
              </TView>
              {detailsReq.isSuccess && (
                <>
                  <Icons.Entypo name="dot-single" color={'white'} />
                  <TText style={tw`text-white text-xs`}>
                    {getDuration(details?.episode_run_time[0])}
                  </TText>
                  <Icons.Entypo name="dot-single" color={'white'} />
                </>
              )}
              <TText style={tw`text-white text-xs`}>
                {moment(data.first_air_date).format('DD MMMM YYYY')}
              </TText>
            </TView>
            <ContentActionBar
              data={data}
              style={tw`mt-1`}
              contentKind={'movie'}
              id={id}
            />
            {/* Genre */}
            <GenreSection genreIds={data.genre_ids} contentKind="tv" />
          </TView>
          <Image
            style={tw`h-48 w-32 rounded-lg border-2 border-primary`}
            source={{uri: getImageURL(data.poster_path)}}
          />
        </TView>
      </ImageBackground>

      {/* Story Line */}
      <Section labelColor={'white'} label="Story line">
        <TText color={'white'} mX={8} style={tw` text-gray-200  `}>
          {data.overview ?? details?.overview ?? ''}
        </TText>
      </Section>
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
