import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {FeaturedMovieList} from '../../components/FeaturedList';
import HomeHeader from '../../components/HomeHeader';
import TopicSection from '../../components/TopicSection';
import TScrollView from '../../components/ui/TScrollView';
export default function MoviesHomeScreen() {
  const scrollViewRef = useRef(null);
  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({y: 0});
    }, []),
  );

  return (
    <TScrollView ref={scrollViewRef}>
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
