import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {FeaturedMovieList} from '../../components/FeaturedList';
import TopicSection from '../../components/TopicSection';
import TScrollView from '../../components/ui/TScrollView';
import tw from '../../libs/tailwind';
export default function MoviesHomeScreen() {
  const scrollViewRef = useRef(null);
  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({y: 0});
    }, []),
  );

  return (
    <TScrollView style={tw`bg-black`} ref={scrollViewRef}>
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
