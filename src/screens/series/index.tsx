import React from 'react';
import {FeaturedMovieList} from '../../components/FeaturedList';
import TopicSection from '../../components/TopicSection';
import TScrollView from '../../components/ui/TScrollView';
import tw from '../../libs/tailwind';
export default function MoviesHomeScreen() {
  return (
    <TScrollView style={tw`bg-black`}>
      <FeaturedMovieList contentKind="tv" />
      <TopicSection
        contentKind="tv"
        topic={{name: 'Top Rated Series', kind: 'top_rated'}}
      />
      <TopicSection
        contentKind="tv"
        topic={{name: 'Popular Series', kind: 'popular'}}
      />
    </TScrollView>
  );
}
