import {MMKV} from 'react-native-mmkv';
import {create} from 'zustand';
import {StateStorage, createJSONStorage, persist} from 'zustand/middleware';

const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

type OnboardingState = {
  scrollEnabled: boolean;
  doneEnabled: boolean;
  nextEnabled: boolean;
  pageIndex: number;
  selectedItems: any[];
  selectedGenre: any[];
  setSelectedItem: (v: any) => void;
  setSelectedGenre: (v: any) => void;
  setPageIndex: (v: number) => void;
  setDoneEnabled: (v: boolean) => void;
  disableScrolling: () => void;
  enableScrolling: () => void;
};

export const useOnboarding = create(
  persist<OnboardingState>(
    set => ({
      scrollEnabled: true,
      doneEnabled: true,
      nextEnabled: true,
      pageIndex: 0,
      selectedItems: [],
      selectedGenre: [],
      setDoneEnabled(v) {
        set({doneEnabled: v});
      },
      setPageIndex: v => set({pageIndex: v}),
      setSelectedItem: v => set({selectedItems: v}),
      setSelectedGenre: v => set({selectedGenre: v}),
      disableScrolling: () =>
        set({scrollEnabled: false, doneEnabled: false, nextEnabled: false}),
      enableScrolling: () =>
        set({scrollEnabled: true, doneEnabled: true, nextEnabled: true}),
    }),
    {
      name: 'onboarding_storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
