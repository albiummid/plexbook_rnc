import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import TabView from '../components/ui/TabView';
import MoviesHomeScreen from './contents/movies';
import SeriesHomeScreen from './contents/series';
import tw from '../lib/tailwind';
import ActorHomeScreen from './contents/actor';

export default function HomeScreen() {
  return (
    <View style={tw`flex-1 `}>
      <TabView
        // stickyTab={true}
        textStyle={tw``}
        tabItems={[
          {
            name: 'Movies',
            component: MoviesHomeScreen,
          },
          {
            name: 'Series',
            component: SeriesHomeScreen,
          },
          {
            name: 'Actors',
            component: ActorHomeScreen,
          },
        ]}
      />
    </View>
  );
}
