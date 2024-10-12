import {MMKV} from 'react-native-mmkv';
import {create} from 'zustand';
import {createJSONStorage, persist, StateStorage} from 'zustand/middleware';

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
  selectedLanguage: any[];
  selectedGenre: any[];
  userDetails: null | {
    _id: string;
    userInfo: object;
    userPreference: object;
    uid: string;
    deviceInfo: object;
  };
  setUserDetails: (v: any) => void;
  setSelectedLanguage: (v: any) => void;
  setSelectedGenre: (v: any) => void;
  setPageIndex: (v: number) => void;
  setDoneEnabled: (v: boolean) => void;
  disableScrolling: () => void;
  enableScrolling: () => void;
  reset: () => void;
};

const onboardingIS = {
  scrollEnabled: true,
  doneEnabled: true,
  nextEnabled: true,
  pageIndex: 0,
  selectedLanguage: [],
  selectedGenre: [],
  userDetails: null,
};

export const useOnboarding = create<OnboardingState>(set => ({
  ...onboardingIS,
  setUserDetails(v) {
    set({userDetails: v});
  },
  setDoneEnabled(v) {
    set({doneEnabled: v});
  },
  setPageIndex: v => set({pageIndex: v}),
  setSelectedLanguage: v => set({selectedLanguage: v}),
  setSelectedGenre: v => set({selectedGenre: v}),
  disableScrolling: () =>
    set({scrollEnabled: false, doneEnabled: false, nextEnabled: false}),
  enableScrolling: () =>
    set({scrollEnabled: true, doneEnabled: true, nextEnabled: true}),
  reset: () => set(onboardingIS),
}));

type TAppConfig = {
  ENV: 'dev' | 'prod';
  BASE_URL: string;
  setENV: (v: 'dev' | 'prod') => void;
};

export const useAppConfig = create(
  persist<TAppConfig>(
    set => ({
      ENV: 'dev',
      BASE_URL: 'https://cinespire-server.vercel.app/api/v1',
      setENV: (v: 'dev' | 'prod') => {
        if (v == 'dev') {
          set({BASE_URL: 'http://:192.168.0.106:9999/api/v1'});
        } else {
          set({BASE_URL: 'https://cinespire-server.vercel.app/api/v1'});
        }
        set({ENV: v});
      },
      // setBASE_URL: (v: string) => set({BASE_URL: v}),
    }),
    {
      name: 'app-config',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

interface IAppState {
  isConnectionExpensive: boolean;
  serverStatus: 'reachable' | 'unreachable' | 'idle';
  internetStatus: 'connected' | 'disconnected' | 'idle';
}

export const appState = create<IAppState>(() => ({
  isConnectionExpensive: false,
  serverStatus: 'idle',
  internetStatus: 'idle',
}));

interface ContentState {
  contentType: string;
  selectedTag: null | any;
  selectedTagId: string;
  selectedIds: number[];
  setSelectedIds: (list: number[]) => void;
  toggleItem: (item: any) => void;
  setSelectedTag: (tag: any) => void;
  setContentType: (content: 'movie' | 'tv') => void;
}

const contentInitState = {
  selectedTag: null,
  selectedTagId: '',
  contentType: 'movie',
  selectedIds: [],
};

export const useContentState = create<ContentState>((set, get) => ({
  ...contentInitState,
  setSelectedIds(list: any[]) {
    set({
      selectedIds: list,
    });
  },
  toggleItem(id: number) {
    set(state => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter(x => x !== id)
        : state.selectedIds.concat(id),
    }));
  },
  setSelectedTag(tag) {
    set({selectedTag: tag, selectedTagId: tag?._id || ''});
  },
  setContentType(content) {
    set({
      contentType: content,
      selectedTag: '',
      selectedIds: [],
    });
  },
}));
