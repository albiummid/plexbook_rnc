import moment from 'moment';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Header from '../../components/layout/Header';
import TScrollView from '../../components/ui/TScrollView';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import tw from '../../lib/tailwind';
import {getImageURL, useSeriesSeason} from '../../lib/tmdb';
import {ScreenProps} from '../../navigation/Screens';

export default function SeasonDetails(props: ScreenProps<'season_details'>) {
  const {data, id} = props.route.params;
  const {data: details, ...req} = useSeriesSeason(id, data.season_number);
  console.log(details?.name);
  return (
    <TView style={tw`flex-1 bg-black`}>
      <Header />
      <TView style={tw`mx-2 gap-y-2 `}>
        <TView stack="hStack" gap={2}>
          <Image
            style={tw`h-50 w-36 rounded-lg`}
            source={{uri: getImageURL(data.poster_path)}}
          />
          <TView style={tw`flex-1 gap-y-1`}>
            <TText style={tw`text-lg text-white font-bold`}>
              Season {data?.season_number}
            </TText>
            <TText color={'white'}>
              {moment(data.air_date).format('DD MMMM YYYY')}
            </TText>
            <TText color={'white'}>
              {data?.overview.length > 0
                ? data.overview
                : details?.episodes[0]?.overview}
            </TText>
          </TView>
        </TView>
        <TScrollView horizontal>
          {details?.episodes.map(x => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                style={tw`flex-row gap-2 mr-2  w-60  rounded-lg`}
                key={x.id}>
                <Image
                  style={tw`h-40 w-full rounded-lg`}
                  source={{uri: getImageURL(x.still_path)}}
                />
                <TView
                  style={tw` absolute p-2 bottom-0 rounded-b-lg flex-1 bg-black/60 w-full mt-auto`}>
                  <TText color={'white'} style={tw` font-bold `}>
                    Episode {x.episode_number}
                  </TText>

                  <TText style={tw`flex-1 text-white`}>{x.name}</TText>
                </TView>
              </TouchableOpacity>
            );
          })}
        </TScrollView>
      </TView>
    </TView>
  );
}
