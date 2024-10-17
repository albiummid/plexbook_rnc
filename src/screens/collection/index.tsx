import {View, Text, ImageBackground, ScrollView} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {getBackdropImageURL, getPosterImageURL, tmdbGET} from '../../libs/tmdb';
import Section from '../../components/Section';
import Fallback from '../../components/ui/ScreenFallback';
import TImage from '../../components/ui/TImage';
import tw from '../../libs/tailwind';
import TText from '../../components/ui/TText';
import {CollectionMovieCard} from '../../components/content/card/movie-card';

export default function CollectionDetails({...props}) {
  const {id} = props.route.params;
  const {data: details, ...detailsReq} = useQuery({
    queryKey: ['collection-details', {id}],
    enabled: Boolean(id),
    queryFn: async () => {
      const {data} = await tmdbGET(`/collection/${id}`);
      return data;
    },
  });

  if (!details) {
    return (
      <Fallback isLoading={detailsReq.isLoading} error={detailsReq.error} />
    );
  }
  return (
    <Section label={details?.name}>
      <View
        // source={{uri: getBackdropImageURL(details?.backdrop_path, 'w780')}}
        style={tw`flex-row justify-between`}>
        <View style={tw`flex-1 pr-3`}>
          <TText numberOfLines={5}>{details.overview}</TText>
        </View>
        {/* <TImage
          source={{uri: getPosterImageURL(details.poster_path, 'w185')}}
          style={tw`w-24 h-36 rounded-lg border border-primary`}
        /> */}
      </View>
      <ScrollView>
        <View style={tw`flex-row flex-wrap gap-5`}>
          {details?.parts?.map((x: any, y: number) => {
            return (
              <CollectionMovieCard
                index={y}
                key={y}
                contentId={x.id}
                data={x}
                disable={false}
              />
            );
          })}
        </View>
      </ScrollView>
    </Section>
  );
}
