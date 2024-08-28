import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList} from 'react-native';
import Section from '../components/Section';
import ContentSkelton from '../components/content/card/content-skelton';
import MovieCard from '../components/content/card/movie-card';
import SeriesCard from '../components/content/card/series-card';
import tw from '../lib/tailwind';
import {getPopularContents, getTopRatedContents} from '../lib/tmdb';
import {ScreenProps} from '../navigation/Screens';

export default function TopicListScreen(props: ScreenProps<'topic_list'>) {
  const {topicKind, contentKind} = props.route.params;
  const {data: infiniteRes, ...infiniteReq} = useQuery({
    queryKey: ['topic-list', topicKind, contentKind],
    queryFn: ({pageParam}) => {
      if (topicKind === 'popular') {
        return getPopularContents(contentKind, 1);
      } else {
        return getTopRatedContents(contentKind, 1);
      }
    },
  });

  if (topicKind === 'top_rated') {
    console.log(infiniteRes?.data);
  }

  return (
    <Section
      label={
        topicKind === 'top_rated'
          ? 'Top Rated'
          : topicKind === 'popular'
          ? 'Popular'
          : topicKind
      }>
      {infiniteRes?.data && (
        <FlatList
          numColumns={3}
          data={infiniteRes.data.results}
          columnWrapperStyle={tw`gap-x-5`}
          contentContainerStyle={tw`gap-y-5 justify-center items-center`}
          renderItem={({item, index}) => {
            if (contentKind === 'movie') {
              return <MovieCard key={index} data={item} />;
            } else {
              return <SeriesCard key={index} data={item} />;
            }
          }}
        />
      )}
      {!infiniteRes?.data && (
        <FlatList
          numColumns={2}
          data={[...Array(20).keys()]}
          columnWrapperStyle={tw`gap-x-5`}
          contentContainerStyle={tw`gap-y-5 justify-center items-center`}
          renderItem={({item}) => {
            return <ContentSkelton style={tw`h-40 w-28 rounded-lg`} />;
          }}
        />
      )}
    </Section>
  );
}
