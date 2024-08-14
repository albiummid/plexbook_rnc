import {
  CommonActions,
  createNavigationContainerRef,
  NavigationContainer,
  StackActions,
} from '@react-navigation/native';
import {PropsWithChildren} from 'react';

const navigationRef = createNavigationContainerRef();
export const NavigationProvider = ({children}: PropsWithChildren) => {
  return (
    <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>
  );
};

const navigate = (routeName: string, params?: any) => {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(CommonActions.navigate(routeName, params));
};

const push = (routeName: string, params?: any) => {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(StackActions.push(routeName, params));
};

const replace = (routeName: string, params?: any) => {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(StackActions.replace(routeName, params));
};

const reset = (routeName: string, params?: any, path?: any, state?: any) => {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName, params, state, path}],
    }),
  );
};

const goBack = () => {
  if (!navigationRef.isReady()) return;
  if (navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

export const router = {
  navigate,
  push,
  goBack,
  replace,
  reset,
};
