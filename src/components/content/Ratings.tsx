import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
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

  if (req.isLoading) return <Skelton style={tw` w-1/2 rounded-lg h-6`} />;
  if (!ratingData) return null;
  return (
    <View style={tw``}>
      <View style={tw`flex-row items-center gap-2`}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`https://imdb.com/title/${imdbId}`);
          }}>
          <TText
            style={tw`text-primary text-xs px-3 border border-primary rounded-lg  py-1`}>
            IMDb: {ratingData.imdbRating}
          </TText>
        </TouchableOpacity>
        {ratingData.rottenTomatoesScore !== 'N/A' ? (
          <TText
            style={tw`text-primary text-xs px-3 border border-primary rounded-lg  py-1`}>
            RottenTomatoes: {ratingData.rottenTomatoesScore} %
          </TText>
        ) : null}
        {ratingData.metaScore !== 'N/A' ? (
          <TText
            style={tw`text-primary text-xs px-3 border border-primary rounded-lg  py-1`}>
            MetaCritic: {ratingData.metaScore}
          </TText>
        ) : null}
      </View>
    </View>
  );
}
