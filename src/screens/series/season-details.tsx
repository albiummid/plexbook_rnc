import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Section from '../../components/Section';
import TScrollView from '../../components/ui/TScrollView';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import tw from '../../lib/tailwind';
import {getImageURL, useSeriesSeason} from '../../lib/tmdb';
import {ScreenProps} from '../../navigation/Screens';

export default function SeasonDetails(props: ScreenProps<'season_details'>) {
  const {data, id} = props.route.params;
  const {data: details, ...req} = useSeriesSeason(id, data.season_number);

  return (
    <Section label={data.name} style={tw`flex-1 h-full `}>
      <TView style={tw`mx-2`}>
        <TScrollView>
          {details?.episodes.map(x => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                style={tw`flex-row gap-2 mb-2  rounded-lg`}
                key={x.id}>
                <Image
                  style={tw`h-40 w-full rounded-lg`}
                  source={{uri: getImageURL(x.still_path)}}
                />
                <TView
                  style={tw` absolute p-2 bottom-0 rounded-b-lg flex-1 bg-black/60 w-full mt-auto`}>
                  <TText color={'white'} style={tw` font-bold `}>
                    E{x.episode_number} - {x.name}
                  </TText>
                  {/* <TText style={tw`flex-1 text-white`}>{x.overview}</TText> */}
                </TView>
              </TouchableOpacity>
            );
          })}
        </TScrollView>
      </TView>
    </Section>
  );
}
