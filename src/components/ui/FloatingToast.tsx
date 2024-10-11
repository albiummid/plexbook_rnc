import React, {useEffect, useState} from 'react';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {create} from 'zustand';
import tw from '../../libs/tailwind';

interface IFloatingState {
  isOpen: boolean;
  id: number;
  message: string;
  status: 'success' | 'error';
  duration: number;
}

interface IToastState {
  toasts: IFloatingState[];
  showToast: (
    message: string,
    status?: 'success' | 'error',
    duration?: 1000,
  ) => void;
  hideToast: (id: number) => void;
}

const hideFactor = 20;
const showFactor = -20;

export const fToastState = create<IToastState>(set => ({
  toasts: [],
  showToast: (message, status = 'success', duration = 1000) => {
    console.log(fToastState.getState());
    set(state => ({
      toasts: [
        ...state.toasts,
        {
          id: state.toasts.length,
          isOpen: true,
          message,
          status,
          duration,
        },
      ],
    }));
  },
  hideToast: id =>
    set(state => ({
      toasts: state.toasts.map(x => ({
        ...x,
        isOpen: x.id === id ? false : x.isOpen,
      })),
    })),
}));

export const {showToast, hideToast} = fToastState.getState();

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
    if (!activeToast || !activeToast.isOpen) return;
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
            `  text-white w-full z-10 p-2 text-center`,
            activeToast?.status === 'error' ? 'bg-red-400' : 'bg-green-400',
          ),
          {transform: [{translateY: translateY}]},
        ]}>
        {activeToast?.message}
      </Animated.Text>
    </>
  );
}
