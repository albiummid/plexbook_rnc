import React from 'react';
import {FeaturedMovieList} from '../../components/FeaturedList';
import HomeHeader from '../../components/HomeHeader';
import TopicSection from '../../components/TopicSection';
import TScrollView from '../../components/ui/TScrollView';
import tw from '../../libs/tailwind';
export default function MoviesHomeScreen() {
  return (
    <TScrollView style={tw`bg-black`}>
      <HomeHeader />
      <FeaturedMovieList contentKind="movie" />
      <TopicSection
        contentKind="movie"
        topic={{name: 'Top Rated', kind: 'top_rated'}}
      />
      <TopicSection
        contentKind="movie"
        topic={{name: 'Popular', kind: 'popular'}}
      />
    </TScrollView>
  );
}
