import moment from 'moment';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Header from '../../components/layout/Header';
import TScrollView from '../../components/ui/TScrollView';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import {ScreenProps} from '../../libs/navigation/Screens';
import tw from '../../libs/tailwind';
import {
  getPosterImageURL,
  getStillImageURL,
  useSeriesSeason,
} from '../../libs/tmdb';

export default function SeasonDetails(props: ScreenProps<'season_details'>) {
  const {data, id} = props.route.params;
  const {data: details, ...req} = useSeriesSeason(id, data.season_number);
  return (
    <TView style={tw`flex-1 bg-black`}>
      <Header />
      <TView style={tw`mx-2 gap-y-2 `}>
        <TView stack="hStack" gap={2}>
          <Image
            style={tw`h-50 w-36 rounded-lg`}
            source={{uri: getPosterImageURL(data.poster_path, 'w185')}}
          />
          <TView style={tw`flex-1 gap-y-1`}>
            <TText style={tw`text-lg text-white font-bold`}>
              Season {data?.season_number}
            </TText>
            <TText style={tw`text-white`}>
              {moment(data.air_date).format('DD MMMM YYYY')}
            </TText>
            <TText style={tw`text-white`}>
              {data?.overview.length > 0
                ? data.overview
                : details?.episodes[0]?.overview}
            </TText>
          </TView>
        </TView>
        <TScrollView>
          {details?.episodes.map(x => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                style={tw`flex-row gap-2 flex-1 my-2 rounded-lg`}
                key={x.id}>
                <Image
                  style={tw`h-40 w-full rounded-lg`}
                  source={{uri: getStillImageURL(x.still_path, 'w185')}}
                />
                <TView
                  style={tw` absolute p-2 bottom-0 rounded-b-lg flex-1 bg-black/60 w-full mt-auto`}>
                  <TText style={tw`flex-1 text-white`}>
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
