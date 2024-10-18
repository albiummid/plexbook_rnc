import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import {api} from '../../libs/api';
import tw from '../../libs/tailwind';
import Skelton from '../ui/Skelton';
import TText from '../ui/TText';

export default function Ratings({imdbId}: {imdbId: string}) {
  const {data: ratingData, ...req} = useQuery({
    queryKey: ['ratings', {imdbId}],
    enabled: Boolean(imdbId),
    queryFn: async () => {
      const {data} = await api.get('/content/ratings/' + imdbId);
      return data.result;
    },
  });

  const buttonStyles = tw`text-primary text-xs  pl-2 border-l border-primary`;
  if (!ratingData) return null;
  return (
    <View>
      <ScrollView horizontal style={tw``}>
        <View style={tw`flex-row items-center gap-2`}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`https://imdb.com/title/${imdbId}`);
            }}>
            <TText style={[buttonStyles, tw`border-l-0 pl-0`]}>
              IMDb : {ratingData.imdbRating}
            </TText>
          </TouchableOpacity>
          {ratingData.rottenTomatoesScore !== 'N/A' ? (
            <TText style={buttonStyles}>
              RottenTomatoes: {ratingData.rottenTomatoesScore} %
            </TText>
          ) : null}
          {ratingData.metaScore !== 'N/A' ? (
            <TText style={buttonStyles}>
              MetaCritic: {ratingData.metaScore}
            </TText>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
