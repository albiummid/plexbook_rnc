import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import {
  getBackdropImageURL,
  getPosterImageURL,
  getProfileImageURL,
  tmdbGET,
} from '../../libs/tmdb';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../../libs/tailwind';
import TView from '../ui/TView';
import TText from '../ui/TText';
import GenreSection from './section/GenreSection';
import Ratings from './Ratings';
import Icons from '../ui/vector-icons';
import moment from 'moment';
import ContentActionBar from './action-bar';
import {useQuery} from '@tanstack/react-query';
import Header from '../layout/Header';

export default function DetailsHero({
  id,
  contentKind,
  details,
}: {
  id: number;
  contentKind: 'movie' | 'tv' | 'person';
  details: any;
}) {
  const imageURI =
    contentKind == 'person'
      ? getProfileImageURL(details?.profile_path, 'w185')
      : getPosterImageURL(details?.poster_path, 'w185');
  const {data: imdbId, ...imdbReq} = useQuery({
    queryKey: ['imdb-id', {id}],
    enabled: Boolean(contentKind === 'tv'),
    queryFn: async () => {
      const {data} = await tmdbGET(`/tv/${id}/external_ids`);
      return data.imdb_id;
    },
  });
  const contentKindDataMap = {
    label: {
      movie: details.title,
      tv: details.name,
      person: details.name,
    },
    contentDate: {
      movie: details?.release_date,
      tv: details?.first_air_date,
      person: details?.birthday,
    },
    overview: {
      movie: details.overview,
      tv: details.overview,
      person: details.biography,
    },
  };

  return (
    <ImageBackground
      style={tw``}
      blurRadius={1}
      source={{
        uri:
          contentKind === 'person'
            ? 'https://'
            : getBackdropImageURL(details.backdrop_path as string, 'w300'),
      }}>
      <LinearGradient
        style={tw`p-2 `}
        colors={['transparent', 'black']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <Header />
        <TView
          stack="hStack"
          alignItems="end"
          justifyContent="center"
          style={tw` `}>
          <TView gapY={1} style={tw` flex-1`}>
            {/* Poster side intro */}
            <TText style={tw`text-white font-bold text-xl mt-5`}>
              {contentKindDataMap.label[contentKind]}
            </TText>
            {contentKind !== 'person' ? (
              <>
                <GenreSection
                  genres={details.genres}
                  contentKind={contentKind}
                />
                <Ratings
                  imdbId={contentKind === 'tv' ? imdbId : details?.imdb_id}
                />
                <TView stack="hStack" gapX={1} alignItems="center">
                  <TView stack="hStack" gap={1} alignItems="center">
                    <Icons.AntDesign style={tw`text-primary`} name="star" />
                    <TText style={tw`text-white text-xs`}>
                      {Number(details?.vote_average).toFixed(1)}
                    </TText>
                  </TView>
                  <Icons.Entypo name="dot-single" color={'white'} />
                  <TText style={tw`text-white text-xs`}>
                    {moment(contentKindDataMap.contentDate[contentKind]).format(
                      'MMMM YYYY',
                    )}
                  </TText>
                </TView>
                <TText numberOfLines={3} style={tw`text-xs text-white pr-5`}>
                  {contentKindDataMap.overview[contentKind]}
                </TText>
              </>
            ) : (
              <TView style={tw`flex-row gap-2`}>
                <TView style={tw`flex-1`}>
                  <TText numberOfLines={3} style={tw` text-xs text-white mb-1`}>
                    {details?.also_known_as.join(' , ')}
                  </TText>
                  <TText style={tw` text-sm text-white`}>
                    <TText style={tw`font-semibold`}>Profession :</TText>{' '}
                    {details?.known_for_department}
                  </TText>

                  <TText style={tw`text-white`}>
                    <TText style={tw`font-bold`}>Gender : </TText>{' '}
                    {details.gender == 1 ? 'Female' : 'Male'}
                  </TText>
                  <TText style={tw` text-sm text-white`}>
                    <TText style={tw`font-bold`}>Birth : </TText>{' '}
                    {moment(details?.birthday).format('DD MMMM YYYY')}
                  </TText>
                  {details?.deathday ? (
                    <TText style={tw` text-sm text-white`}>
                      <TText style={tw`font-bold`}>Death : </TText> [`
                      {moment(details.deathday).format('DD MMMM YYYY')}`]
                    </TText>
                  ) : null}

                  <TText style={tw`text-white`}>
                    <TText style={tw`font-bold`}>Location : </TText>{' '}
                    {details?.place_of_birth}
                  </TText>
                </TView>
              </TView>
            )}
          </TView>
          <Image
            style={tw`h-40 w-26 rounded-lg border-2 border-primary`}
            source={{uri: imageURI}}
          />
        </TView>
        <ContentActionBar
          data={details}
          style={tw` mx-auto mt-5`}
          contentKind={contentKind}
          id={id}
        />
      </LinearGradient>
    </ImageBackground>
  );
}
