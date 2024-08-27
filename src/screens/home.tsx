import React from 'react';
import {View} from 'react-native';
import TabView from '../components/ui/TabView';
import tw from '../lib/tailwind';
import MoviesHomeScreen from './contents/movies';
import SeriesHomeScreen from './series';

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
          // {
          //   name: 'Actors',
          //   component: ActorHomeScreen,
          // },
          // {
          //   name: 'Shots',
          //   component: ShotsHomeScreen,
          // },
        ]}
      />
    </View>
  );
}
