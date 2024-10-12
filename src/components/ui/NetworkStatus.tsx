import {addEventListener} from '@react-native-community/netinfo';
import {useEffect} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {api} from '../../libs/api';
import {appState} from '../../libs/zustand';
import {hideToast, showToast} from './FloatingToast';

export default function NetworkStatus() {
  const {serverStatus, internetStatus} = appState();
  const internetTranslateY = useSharedValue(20);
  const serverTranslateY = useSharedValue(20);
  const containerTranslateY = useSharedValue(20);

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      appState.setState({
        internetStatus:
          state.isInternetReachable === null
            ? 'idle'
            : state.isInternetReachable
            ? 'connected'
            : 'disconnected',
        isConnectionExpensive: state.details?.isConnectionExpensive,
      });
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (serverStatus === 'idle') {
      api
        .get('/auth/health-check')
        .then(res => {
          appState.setState({
            serverStatus: res.status === 200 ? 'reachable' : 'unreachable',
          });
        })
        .catch(error => {
          appState.setState({
            serverStatus: 'unreachable',
          });
        });
    }

    let id = 'internetStatus';
    if (internetStatus === 'disconnected') {
      showToast({
        id,
        message: 'You are now in offline',
        duration: -1,
        status: 'error',
      });
      return;
    } else if (internetStatus === 'connected') {
      hideToast(id);
    }

    // Toast
    let serverToastId = 'serverToast';
    if (serverStatus === 'unreachable') {
      showToast({
        id: serverToastId,
        status: 'error',
        message:
          'Something went wrong.\nPlease check your internet connection.',
        duration: -1,
      });
    } else if (serverStatus === 'reachable') {
      hideToast(serverToastId);
    }
  }, [serverStatus, internetStatus]);

  return null;
}
