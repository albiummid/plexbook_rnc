import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {PropsWithChildren} from 'react';
import Icons from '../../components/ui/vector-icons';
import {colors} from '../../constants/colors';
import CastListScreen from '../../screens/cast';
import GenreList from '../../screens/genrelist';
import ListScreen from '../../screens/list';
import LoginScreen from '../../screens/login';
import MoviesHomeScreen from '../../screens/movies';
import MovieDetailScreen from '../../screens/movies/details';
import Onboarding from '../../screens/onboarding';
import PersonDetailScreen from '../../screens/person/details';
import ProfileScreen from '../../screens/profile';
import SearchScreen from '../../screens/search';
import SeriesHomeScreen from '../../screens/series';
import SeriesDetailScreen from '../../screens/series/details';
import SeasonDetails from '../../screens/series/season-details';
import SplashScreen from '../../screens/splash';
import TopicListScreen from '../../screens/topic';
import {TPersonListItem} from '../../types/contents/content.types';
import {TMovieListItem} from '../../types/contents/movie.types';
import {Season, TSeriesListItem} from '../../types/contents/series.types';
import tw from '../tailwind';
import {RouteName} from './navigator';

type TTabScreenListItem = {
  name: RouteName;
  component: () => JSX.Element;
  options?: BottomTabNavigationOptions | NativeStackNavigationOptions;
};
const TabScreen = (
  name: RouteName,
  component: () => JSX.Element,
  options?: BottomTabNavigationOptions,
) => ({
  name,
  component,
  options,
});
const StackScreen = (
  name: RouteName,
  component: (props: PropsWithChildren<any>) => JSX.Element,
  options?: NativeStackNavigationOptions,
) => ({
  name,
  component,
  options,
});

export type RootStackParamList = {
  splash: undefined;
  onboarding: undefined;
  login: undefined;
  tab_root: undefined;
  tab_home: undefined;
  tab_movies: undefined;
  tab_series: undefined;
  tab_search: undefined;
  tab_profile: undefined;
  list: undefined;
  topic_list: {
    contentKind: 'movie' | 'tv';
    topicKind: string;
  };
  cast_list: {
    id: number;
  };
  movie_details: {
    id: number;
    data: TMovieListItem;
  };
  series_details: {
    id: number;
    data: TSeriesListItem;
  };
  person_details: {
    id: number;
    data: TPersonListItem;
  };
  genre_list: {
    id: number;
    contentKind: 'movie' | 'tv';
  };
  season_details: {
    id: number;
    data: Season;
  };
};

export const tabScreens: TTabScreenListItem[] = [
  TabScreen('tab_movies', MoviesHomeScreen, {
    tabBarIcon(props) {
      return (
        <Icons.MaterialCommunityIcons
          {...props}
          name={props.focused ? 'movie-open' : 'movie-open-outline'}
        />
      );
    },
  }),
  TabScreen('tab_series', SeriesHomeScreen, {
    tabBarIcon(props) {
      return (
        <Icons.Ionicons name={props.focused ? 'tv' : 'tv-outline'} {...props} />
      );
    },
  }),
  TabScreen('tab_search', SearchScreen, {
    tabBarIcon(props) {
      return <Icons.Feather name={'search'} {...props} />;
    },
  }),
  TabScreen('tab_profile', ProfileScreen, {
    tabBarIcon(props) {
      return <Icons.Feather name="user" {...props} />;
    },
  }),
];

const Tab = createBottomTabNavigator();
export function BottomTab() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.active_tint,
          tabBarInactiveTintColor: colors.inactive_tint,
          headerShadowVisible: false,
          tabBarShowLabel: false,
          tabBarStyle: tw`bg-black`,
        })}>
        <>
          {tabScreens.map((item, index) => {
            return (
              <Tab.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={item.options as BottomTabNavigationOptions}
              />
            );
          })}
        </>
      </Tab.Navigator>
    </>
  );
}

export const authenticatedStack = [
  StackScreen('tab_root', BottomTab),
  StackScreen('list', ListScreen),
  StackScreen('topic_list', TopicListScreen),
  StackScreen('cast_list', CastListScreen),
  StackScreen('genre_list', GenreList),
  StackScreen('movie_details', MovieDetailScreen),
  StackScreen('series_details', SeriesDetailScreen),
  StackScreen('season_details', SeasonDetails),
  StackScreen('person_details', PersonDetailScreen),
];

export const nonAuthStack = [
  StackScreen('splash', SplashScreen),
  StackScreen('onboarding', Onboarding),
  StackScreen('login', LoginScreen),
  // Screen('RegisterScreen', RegisterScreen),
];

export const mergedStacks = [...nonAuthStack, ...authenticatedStack];

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const RootStack = createNativeStackNavigator<RootStackParamList>();
export function RootNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName={'splash'}
      screenOptions={{
        headerShown: false,
      }}>
      {mergedStacks.map((item: any, index: number) => {
        return (
          <RootStack.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </RootStack.Navigator>
  );
}
