import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {PropsWithChildren} from 'react';
import Icons from '../components/ui/vector-icons';
import CastListScreen from '../screens/cast';
import MoviesHomeScreen from '../screens/contents/movies';
import MovieDetailScreen from '../screens/contents/movies/details';
import PersonDetailScreen from '../screens/contents/person/details';
import SeriesHomeScreen from '../screens/contents/series';
import SeriesDetailScreen from '../screens/contents/series/details';
import ListScreen from '../screens/list';
import ProfileScreen from '../screens/profile';
import SearchScreen from '../screens/search';
import TopicListScreen from '../screens/topic';
import BottomTab from './BottomTab';

type TTabScreenListItem = {
  name: string;
  component: () => JSX.Element;
  options?: BottomTabNavigationOptions | NativeStackNavigationOptions;
};
const TabScreen = (
  name: string,
  component: () => JSX.Element,
  options?: BottomTabNavigationOptions,
) => ({
  name,
  component,
  options,
});
const StackScreen = (
  name: string,
  component: (props: PropsWithChildren<any>) => JSX.Element,
  options?: NativeStackNavigationOptions,
) => ({
  name,
  component,
  options,
});

export const routes = {
  // tab
  tab_root: 'tab/root',
  tab_home: 'tab/home',
  tab_movies: 'tab/movies',
  tab_series: 'tab/series',
  tab_search: 'tab/search',
  tab_profile: 'tab/profile',
  // general
  list: 'list',
  // content
  // list -> view more ...
  topic_list: 'topic/list',
  cast_list: 'cast/list',

  //
  movie_details: 'movie/details',
  series_details: 'series/details',
  person_details: 'person/details',
};

export const authStack = [
  // Screen('LoginScreen', LoginScreen),
  // Screen('RegisterScreen', RegisterScreen),
  // Screen('SplashScreen', SplashScreen),
];

export const tabScreens: TTabScreenListItem[] = [
  TabScreen(routes.tab_movies, MoviesHomeScreen, {
    tabBarIcon(props) {
      return (
        <Icons.MaterialCommunityIcons
          {...props}
          name={props.focused ? 'movie-open' : 'movie-open-outline'}
        />
      );
    },
  }),
  TabScreen(routes.tab_series, SeriesHomeScreen, {
    tabBarIcon(props) {
      return (
        <Icons.Ionicons name={props.focused ? 'tv' : 'tv-outline'} {...props} />
      );
    },
  }),
  TabScreen(routes.tab_search, SearchScreen, {
    tabBarIcon(props) {
      return <Icons.Feather name={'search'} {...props} />;
    },
  }),
  TabScreen(routes.tab_profile, ProfileScreen, {
    tabBarIcon(props) {
      return <Icons.Feather name="user" {...props} />;
    },
  }),
];

export const authenticatedStack = [
  StackScreen(routes.tab_root, BottomTab),
  StackScreen(routes.list, ListScreen),
  StackScreen(routes.topic_list, TopicListScreen),
  StackScreen(routes.cast_list, CastListScreen),
  StackScreen(routes.movie_details, MovieDetailScreen),
  StackScreen(routes.series_details, SeriesDetailScreen),
  StackScreen(routes.person_details, PersonDetailScreen),
];

export const mergedStacks = [...authStack, ...authenticatedStack];
