import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {FlatList} from 'react-native';
import Section from '../components/Section';
import ContentSkelton from '../components/content/card/content-skelton';
import MovieCard from '../components/content/card/movie-card';
import SeriesCard from '../components/content/card/series-card';
import tw from '../lib/tailwind';
import {getPopularContents, getTopRatedContents} from '../lib/tmdb';
import {wp} from '../lib/utils/Scaling';
import {StackScreenProps} from '../navigation/navigator';

export default function TopicListScreen(props: StackScreenProps) {
  const {topicKind, contentKind} = props.route.params as any;
  const {data: infiniteRes, ...infiniteReq} = useQuery({
    queryKey: ['topic-list', topicKind, contentKind],
    // initialPageParam: 0,
    queryFn: ({pageParam}) => {
      if (topicKind === 'popular') {
        return getPopularContents(contentKind, 1);
      } else {
        return getTopRatedContents(contentKind, 1);
      }
    },
    // getNextPageParam: lastPage => {
    //   return lastPage.page < lastPage.total_pages
    //     ? lastPage.page + 1
    //     : undefined;
    // },
  });

  console.log(wp(20));

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
          contentContainerStyle={tw``}
          renderItem={({item, index}) => {
            if (contentKind === 'movie') {
              return (
                <MovieCard
                  style={tw`m-2 w-[${wp(30)}] flex-1 h-[${wp(10)}]`}
                  key={index}
                  data={item}
                />
              );
            } else {
              return <SeriesCard key={index} data={item} />;
            }
            // return item.data.results.map((x: any, i: number) => {
            //   if (contentKind === 'movie') {
            //     return <MovieCard key={i} data={x} />;
            //   } else {
            //     return <SeriesCard key={i} data={x} />;
            //   }
            // });
          }}
        />
      )}
      {!infiniteReq.isSuccess && (
        <FlatList
          numColumns={2}
          data={[...Array(20).keys()]}
          renderItem={({item}) => {
            return <ContentSkelton style={tw`h-40 w-28 rounded-lg`} />;
          }}
        />
      )}
    </Section>
  );
}
