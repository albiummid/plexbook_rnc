import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import SearchScreen from '../screens/search';
import ProfileScreen from '../screens/profile';
import ListScreen from '../screens/list';
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
  component: () => JSX.Element,
  options?: NativeStackNavigationOptions,
) => ({
  name,
  component,
  options,
});

export const routes = {
  tab: {
    root: 'tab/root',
    home: 'tab/home',
    search: 'tab/search',
    profile: 'tab/profile',
  },
  stack: {
    // general
    list: 'list',
    // content
    movie_details: 'movie/details',
    series_details: 'series/details',
    person_details: 'person/details',
  },
};

export const authStack = [
  // Screen('LoginScreen', LoginScreen),
  // Screen('RegisterScreen', RegisterScreen),
  // Screen('SplashScreen', SplashScreen),
];

export const tabScreens: TTabScreenListItem[] = [
  TabScreen(routes.tab.home, HomeScreen),
  TabScreen(routes.tab.search, SearchScreen),
  TabScreen(routes.tab.profile, ProfileScreen),
];

export const authenticatedStack = [
  StackScreen(routes.tab.root, BottomTab),
  StackScreen(routes.stack.list, ListScreen),
];

export const mergedStacks = [...authStack, ...authenticatedStack];
