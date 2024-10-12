import React, {useEffect, useState} from 'react';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {create} from 'zustand';
import tw from '../../libs/tailwind';

interface IFloatingState {
  isOpen: boolean;
  id: number | string;
  message: string;
  status: 'success' | 'error';
  duration: number;
}

interface IToastState {
  toasts: IFloatingState[];
  showToast: (props: {
    id?: string | number;
    message: string;
    status?: 'success' | 'error';
    duration?: number;
  }) => IFloatingState | null;
  getToast: (id: number | string) => IFloatingState | null;
  hideToast: (id: number | string) => void;
}

export const fToastState = create<IToastState>(set => ({
  toasts: [],
  getToast: (id): IFloatingState | null => {
    return fToastState.getState().toasts.find(x => x.id === id) || null;
  },
  showToast: ({
    message,
    status = 'success',
    duration = 1000,
    id,
  }): IFloatingState | null => {
    let Id = id || fToastState.getState().toasts.length;
    set(state => ({
      toasts: [
        ...state.toasts,
        {
          id: Id,
          isOpen: true,
          message,
          status,
          duration,
        },
      ],
    }));
    return fToastState.getState().getToast(Id);
  },
  hideToast: id =>
    set(state => ({
      toasts: state.toasts.map(x => ({
        ...x,
        isOpen: x.id === id ? false : x.isOpen,
      })),
    })),
}));

export const {showToast, hideToast, getToast} = fToastState.getState();

export default function FloatingToast() {
  const {toasts} = fToastState();

  const translateY = useSharedValue(40);
  const [activeToast, setActiveToast] = useState<null | IFloatingState>(null);

  const getNextActiveToast = (toastList: IFloatingState[]) => {
    return toastList.find(x => x.isOpen === true) || null;
  };

  useEffect(() => {
    setActiveToast(getNextActiveToast(toasts));
  }, [toasts]);

  useEffect(() => {
    let timeoutId = null;
    if (!activeToast || !activeToast.isOpen || activeToast.duration === -1)
      return;
    timeoutId = setTimeout(() => {
      hideToast(activeToast.id);
    }, activeToast?.duration);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [activeToast]);

  useEffect(() => {
    if (activeToast?.isOpen) {
      translateY.value = withTiming(0, {duration: 500});
    } else {
      translateY.value = withTiming(40, {duration: 500});
    }
  }, [activeToast]);
  console.log(activeToast);

  return (
    <>
      <Animated.Text
        style={[
          tw.style(
            `  text-white absolute w-full bottom-0 z-10 p-2 text-center`,
            activeToast?.status === 'error' ? 'bg-red-400' : 'bg-green-400',
          ),
          {transform: [{translateY: translateY}]},
        ]}>
        {activeToast?.message}
      </Animated.Text>
    </>
  );
}
