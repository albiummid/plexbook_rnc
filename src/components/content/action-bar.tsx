import {useQueries} from '@tanstack/react-query';
import React, {useCallback, useState} from 'react';
import {
  StyleProp,
  ToastAndroid,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {api} from '../../libs/api';
import {ldbValues} from '../../libs/localDB';
import tw from '../../libs/tailwind';
import {ContentKind} from '../../types/common';
import Skelton from '../ui/Skelton';
import TView from '../ui/TView';
import Icons from '../ui/vector-icons';

type ActionBarProps = {
  contentKind: ContentKind;
  id: number;
  style?: StyleProp<ViewStyle>;
  data: any;
};

export default function ContentActionBar({
  contentKind,
  id,
  data,
  style,
}: ActionBarProps) {
  const [watched, setWatched] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [watchLater, setWatchLater] = useState(false);
  const userId = ldbValues.getUserId();

  const queryList = useQueries({
    queries: [
      {
        queryKey: ['Favorite', {id, contentKind}],
        queryFn: () =>
          api.post('/bookmark/item/isBookmarked', {
            contentId: id,
            userId,
            bookmarkName: 'Favorite',
          }),
      },
      {
        queryKey: ['Watch Later', {id, contentKind}],
        queryFn: () =>
          api.post('/bookmark/item/isBookmarked', {
            contentId: id,
            userId,
            bookmarkName: 'Watch Later',
          }),
      },
      {
        queryKey: ['Watched', {id, contentKind}],
        queryFn: () =>
          api.post('/bookmark/item/isBookmarked', {
            contentId: id,
            userId,
            bookmarkName: 'Watched',
          }),
      },
    ],
    combine(result) {
      return {
        favorite: result[0].data?.data?.result,
        watchLater: result[1].data?.data?.result,
        watched: result[2].data?.data?.result,
        refetch: () => {
          result.forEach(x => x.refetch());
        },
        isLoading:
          result[0].isLoading || result[1].isLoading || result[2].isLoading,
      };
    },
  });

  const doItemBookmark = useCallback(
    async (bookmarkName: string) => {
      await api.post('/bookmark/item/insert', {
        bookmarkName,
        userId,
        content: data,
        contentKind,
        contentId: id,
      });
      ToastAndroid.show(
        `"${data?.title ?? data?.name}" is added in '${bookmarkName}' list`,
        500,
      );
    },
    [id, data, contentKind, userId],
  );
  const undoItemBookmark = useCallback(
    async (bookmarkName: string) => {
      await api.post('/bookmark/item/remove', {
        bookmarkName,
        userId,
        contentId: id,
      });
      ToastAndroid.show(
        `"${data?.title ?? data?.name}" is removed from "${bookmarkName}" list`,
        500,
      );
    },
    [userId, id],
  );
  const handleToggle = useCallback(
    async (
      bookmarkName: 'Watch Later' | 'Favorite' | 'Watched',
      currentState: boolean,
    ) => {
      try {
        if (queryList.isLoading) return;
        if (currentState == true) {
          await undoItemBookmark(bookmarkName);
        } else {
          await doItemBookmark(bookmarkName);
        }

        queryList.refetch();
      } catch (err) {
        ToastAndroid.show(String(err), 2000);
      }
    },
    [queryList],
  );

  if (queryList.isLoading) {
    return (
      <TView stack="hStack" gap={2}>
        {Array.from({length: 3}).map((x, i) => (
          <Skelton key={i} style={tw` h-11 w-11 rounded-full`} />
        ))}
      </TView>
    );
  }

  return (
    <View style={[tw.style(`flex-row gap-2`), style]}>
      <TouchableOpacity
        onPress={() => {
          handleToggle('Favorite', queryList?.favorite?.isExists);
        }}>
        <Icons.Feather
          name="heart"
          size={25}
          style={tw.style(
            ` mr-auto p-2 rounded-full`,
            queryList?.favorite?.isExists
              ? 'bg-rose-400 text-white'
              : 'text-primary bg-white',
          )}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          handleToggle('Watched', queryList?.watched?.isExists);
        }}>
        <Icons.Feather
          name={queryList?.watched?.isExists ? 'eye' : 'eye-off'}
          size={25}
          style={tw.style(
            ` mr-auto p-2 rounded-full`,
            queryList?.watched?.isExists
              ? 'bg-rose-400 text-white'
              : 'text-primary bg-white',
          )}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          handleToggle('Watch Later', queryList?.watchLater?.isExists);
        }}>
        <Icons.Feather
          name="watch"
          size={25}
          style={tw.style(
            ` p-2 rounded-full    `,
            queryList?.watchLater?.isExists
              ? 'bg-rose-400 text-white'
              : 'text-primary bg-white',
          )}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={async () => {
          sheetRef.current?.show();
        }}>
        <Icons.MaterialIcons
          name="playlist-add"
          size={20}
          style={tw.style(` mr-auto p-2 rounded-full bg-rose-400 text-white  `)}
        />
      </TouchableOpacity> */}

      {/* <ActionS */}
      {/* <ActionSheet containerStyle={tw`p-4 min-h-60`} ref={sheetRef}>
        <TText style={tw`text-base font-bold border-b  pb-1 border-gray-200`}>
          Add to list
        </TText>
        <ScrollView>
          <TView style={tw`flex-row flex-wrap  justify-center gap-10`}>
            {data.result.list.map(categoryItemRender)}
          </TView>
          <TView>
            <TText>create new list</TText>
          </TView>
        </ScrollView>
      </ActionSheet> */}
    </View>
  );
}
