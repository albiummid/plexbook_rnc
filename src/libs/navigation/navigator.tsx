import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CommonActions,
  createNavigationContainerRef,
  DocumentTitleOptions,
  LinkingOptions,
  NavigationContainer,
  NavigationContainerProps,
  NavigationContainerRef,
  ParamListBase,
  StackActions,
  Theme,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PropsWithChildren} from 'react';
import {RootStackParamList} from './Screens';

type NavigationProviderProps = NavigationContainerProps & {
  theme?: Theme | undefined;
  linking?: LinkingOptions<RootStackParamList> | undefined;
  fallback?: React.ReactNode;
  documentTitle?: DocumentTitleOptions | undefined;
  onReady?: (() => void) | undefined;
};
export const navigationRef = createNavigationContainerRef();
export const NavigationProvider = ({
  children,
  linking,
}: NavigationProviderProps) => {
  return (
    <NavigationContainer ref={navigationRef} linking={linking as any}>
      {children}
    </NavigationContainer>
  );
};

export type RouteName = keyof RootStackParamList;
export type RouteParam<T extends keyof RootStackParamList> =
  RootStackParamList[T];

const navigate = (routeName: RouteName, params?: RouteParam<RouteName>) => {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(CommonActions.navigate(routeName, params));
};

const push = (routeName: RouteName, params?: any) => {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(StackActions.push(routeName, params));
};

const replace = (routeName: RouteName, params?: any) => {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(StackActions.replace(routeName, params));
};

const reset = (routeName: RouteName, params?: any) => {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName, params}],
    }),
  );
};

const goBack = () => {
  if (!navigationRef.isReady()) return;
  if (navigationRef.canGoBack()) {
    navigationRef.goBack();
    return true;
  } else {
    return false;
  }
};

export const router = {
  navigate,
  push,
  goBack,
  replace,
  reset,
};

export type StackScreenProps<T = unknown> = PropsWithChildren<
  NativeStackScreenProps<ParamListBase> & T
>;
export type TabScreenProps<T = unknown> = PropsWithChildren<
  BottomTabScreenProps<ParamListBase> & T
>;
