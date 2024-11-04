import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {PropsWithChildren, useEffect} from 'react';
import Icons from '../../components/ui/vector-icons';
import {colors} from '../../constants/colors';
import AdminScreen from '../../screens/admin/AdminScreen';
import CastListScreen from '../../screens/cast';
import GenreList from '../../screens/genrelist';
import ListScreen from '../../screens/list';
import LoginScreen from '../../screens/login';
import MoviesHomeScreen from '../../screens/movies';
import MovieDetailScreen from '../../screens/movies/details';
import Onboarding from '../../screens/onboarding';
import PersonDetailScreen from '../../screens/person/details';
import ProfileScreen from '../../screens/profile/profile';
import SearchScreen from '../../screens/search';
import SeriesHomeScreen from '../../screens/series';
import SeriesDetailScreen from '../../screens/series/details';
import SeasonDetails from '../../screens/series/season-details';
import SplashScreen from '../../screens/splash';
import TopicListScreen from '../../screens/topic';
import {TPersonListItem} from '../../types/contents/content.types';
import {TMovieListItem} from '../../types/contents/movie.types';
import {Season, TSeriesListItem} from '../../types/contents/series.types';
import {ldbValues} from '../localDB';
import tw from '../tailwind';
import {NavigationProvider, RouteName, router} from './navigator';
import CollectionDetails from '../../screens/collection';
import ImageScreen from '../../screens/ImageScreen';
import ContentList from '../../screens/content/tag-contents';
import TagContents from '../../screens/content/tag-contents';
import {Linking} from 'react-native';

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
  tab_admin: undefined;
  list: undefined;
  temp: undefined;
  image_screen: {
    type: 'poster' | 'backdrop' | 'profile';
    list: any[];
  };
  topic_list: {
    contentKind: 'movie' | 'tv';
    topicKind: string;
  };
  tag_contents: {
    tagId: string;
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
  collection_details: {
    id: number;
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

if (
  ldbValues.getUserInfo()?.userInfo?.profile?.email === 'albi.ummid@gmail.com'
) {
  tabScreens.push(
    TabScreen('temp', AdminScreen, {
      tabBarIcon(props) {
        return <Icons.Entypo {...props} name={'tools'} />;
      },
    }),
  );
}

const Tab = createBottomTabNavigator();
export function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        // tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.active_tint,
        tabBarInactiveTintColor: colors.inactive_tint,
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarStyle: tw`bg-black h-10`,
      })}>
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
    </Tab.Navigator>
  );
}

export const authStacks = [
  StackScreen('tab_root', BottomTab, {}),
  StackScreen('list', ListScreen),
  StackScreen('topic_list', TopicListScreen),
  StackScreen('cast_list', CastListScreen),
  StackScreen('genre_list', GenreList),
  StackScreen('movie_details', MovieDetailScreen),
  StackScreen('series_details', SeriesDetailScreen),
  StackScreen('season_details', SeasonDetails),
  StackScreen('person_details', PersonDetailScreen),
  StackScreen('collection_details', CollectionDetails),
  StackScreen('image_screen', ImageScreen),
  StackScreen('tag_contents', TagContents),
];

export const nonAuthStack = [
  StackScreen('splash', SplashScreen),
  StackScreen('onboarding', Onboarding),
];

export const mergedStacks = [...nonAuthStack, ...authStacks];

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationProvider>
      <RootStack.Navigator
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
    </NavigationProvider>
  );
}
