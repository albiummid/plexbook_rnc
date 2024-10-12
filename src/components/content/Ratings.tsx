import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {View} from 'react-native';
import {api} from '../../libs/api';
import tw from '../../libs/tailwind';
import Skelton from '../ui/Skelton';
import TText from '../ui/TText';

export default function Ratings({imdbId}: {imdbId: string}) {
  const {data: ratingData} = useQuery({
    queryKey: ['ratings', {imdbId}],
    queryFn: async () => {
      const {data} = await api.get('/content/ratings/' + imdbId);
      return data.result;
    },
  });

  if (!ratingData) return <Skelton style={tw` w-1/2 rounded-lg h-6`} />;
  if (ratingData.imdbRating === 'N/A') return null;
  return (
    <View style={tw``}>
      <View style={tw`flex-row items-center gap-2`}>
        {/* <TImage
          source={require('../../assets/images/IMDb.png')}
          style={[tw`w-12 h-6 bg-red-100 rounded-lg`, {objectFit: 'contain'}]}
        /> */}
        <TText
          style={tw`text-primary text-xs px-3 border border-primary rounded-lg  py-1`}>
          IMDb: {ratingData.imdbRating}/10
        </TText>
        {ratingData.rottenTomatoesScore !== 'N/A' ? (
          <TText
            style={tw`text-primary text-xs px-3 border border-primary rounded-lg  py-1`}>
            RottenTomatoes: {ratingData.rottenTomatoesScore} %
          </TText>
        ) : null}
        {ratingData.metaScore !== 'N/A' ? (
          <TText
            style={tw`text-primary text-xs px-3 border border-primary rounded-lg  py-1`}>
            Meta: {ratingData.metaScore} %
          </TText>
        ) : null}
      </View>
    </View>
  );
}
