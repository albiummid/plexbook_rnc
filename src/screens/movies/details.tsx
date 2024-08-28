import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import React from 'react';
import {Image, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ArtistList from '../../components/ArtistList';
import CollectionList from '../../components/CollectionList';
import ContentActionBar from '../../components/content/action-bar';
import GenreSection from '../../components/content/section/GenreSection';
import TrailerSection from '../../components/content/section/TrailerSection';
import ContentImageList from '../../components/ContentImageList';
import {MovieInfo} from '../../components/ContentInfo';
import Header from '../../components/layout/Header';
import RecommendedList from '../../components/RecommendedList';
import Section from '../../components/Section';
import TScrollView from '../../components/ui/TScrollView';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import Icons from '../../components/ui/vector-icons';
import tw from '../../lib/tailwind';
import {getContentDetailsById, getDuration, getImageURL} from '../../lib/tmdb';
import {ScreenProps} from '../../navigation/Screens';
import {TMovieDetails} from '../../types/contents/movie.types';

export default function MovieDetailScreen({
  route,
}: ScreenProps<'movie_details'>) {
  const {id, data} = route.params;
  const {data: details, ...detailsReq} = useQuery({
    queryKey: ['movie-details', id],
    queryFn: async () => {
      const {data} = await getContentDetailsById('movie', id);
      return data as TMovieDetails;
    },
  });

  return (
    <TScrollView style={tw`bg-black`}>
      <ImageBackground
        blurRadius={5}
        source={{uri: getImageURL(data.backdrop_path)}}>
        <Header textStyle={tw`text-white text-base`} />
        <LinearGradient
          style={tw`absolute bottom-0 w-full h-40`}
          colors={['transparent', 'black']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        />
        <TView
          stack="hStack"
          alignItems="end"
          justifyContent="around"
          style={tw` mt-5 mx-2 gap-4 `}>
          <TView gapY={1}>
            {/* Poster side intro */}
            <TText style={tw`text-white font-bold text-xl w-60`}>
              {data.title}
            </TText>
            {/*  */}

            <TView stack="hStack" gapX={1} alignItems="center">
              <TView stack="hStack" gap={1} alignItems="center">
                <Icons.AntDesign style={tw`text-primary`} name="star" />
                <TText style={tw`text-white text-xs`}>
                  {Number(data.vote_average).toFixed(1)}
                </TText>
              </TView>
              <Icons.Entypo name="dot-single" color={'white'} />
              {detailsReq.isSuccess && (
                <>
                  <TText style={tw`text-white text-xs`}>
                    {getDuration(details?.runtime)}
                  </TText>
                  <Icons.Entypo name="dot-single" color={'white'} />
                </>
              )}
              <TText style={tw`text-white text-xs`}>
                {moment(data.release_date).format('DD MMMM YYYY')}
              </TText>
            </TView>
            <ContentActionBar style={tw`mt-1`} contentKind={'movie'} id={id} />
          </TView>
          <Image
            style={tw`h-48 w-32 rounded-lg border-2 border-primary`}
            source={{uri: getImageURL(data.poster_path)}}
          />
        </TView>
      </ImageBackground>

      {/* Genre */}
      <GenreSection genreIds={data.genre_ids} contentKind="movie" />

      {/* Story Line */}
      <Section labelColor={'white'} label="Story line">
        <TText color={'white'} mX={8} style={tw` text-gray-200  `}>
          {data.overview ?? details?.overview ?? ''}
        </TText>
      </Section>

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

      {/* Content Info */}

      <MovieInfo data={details} isLoading={detailsReq.isLoading} />

      {/* Image list */}
      <ContentImageList id={id} contentKind={'movie'} />
      {/* Recommended List */}
      <RecommendedList contentId={id} contentKind="movie" />
    </TScrollView>
  );
}
