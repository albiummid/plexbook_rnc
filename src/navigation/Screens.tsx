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
import Icons from '../components/ui/vector-icons';
import {colors} from '../constants/colors';
import CastListScreen from '../screens/cast';
import GenreList from '../screens/genrelist';
import ListScreen from '../screens/list';
import MoviesHomeScreen from '../screens/movies';
import MovieDetailScreen from '../screens/movies/details';
import PersonDetailScreen from '../screens/person/details';
import ProfileScreen from '../screens/profile';
import SearchScreen from '../screens/search';
import SeriesHomeScreen from '../screens/series';
import SeriesDetailScreen from '../screens/series/details';
import SeasonDetails from '../screens/series/season-details';
import TopicListScreen from '../screens/topic';
import {TPersonListItem} from '../types/contents/content.types';
import {TMovieListItem} from '../types/contents/movie.types';
import {Season, TSeriesListItem} from '../types/contents/series.types';

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
  tab_root: 'tab_root',
  tab_home: 'tab_home',
  tab_movies: 'tab_movies',
  tab_series: 'tab_series',
  tab_search: 'tab_search',
  tab_profile: 'tab_profile',
  // general
  list: 'list',
  // content
  // list -> view more ...
  topic_list: 'topic_list',
  cast_list: 'cast_list',
  genre_list: 'genre_list',

  //
  movie_details: 'movie_details',
  series_details: 'series_details',
  season_details: 'season_details',
  person_details: 'person_details',
};

export type RootStackParamList = {
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
  StackScreen(routes.tab_root, BottomTab),
  StackScreen(routes.list, ListScreen),
  StackScreen(routes.topic_list, TopicListScreen),
  StackScreen(routes.cast_list, CastListScreen),
  StackScreen(routes.genre_list, GenreList),
  StackScreen(routes.movie_details, MovieDetailScreen),
  StackScreen(routes.series_details, SeriesDetailScreen),
  StackScreen(routes.season_details, SeasonDetails),
  StackScreen(routes.person_details, PersonDetailScreen),
];

export const mergedStacks = [...authStack, ...authenticatedStack];

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const RootStack = createNativeStackNavigator<RootStackParamList>();
export function RootNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName={'tab_root'}
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
