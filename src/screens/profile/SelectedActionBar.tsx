import React from 'react';
import {Alert, ToastAndroid, TouchableOpacity} from 'react-native';
import {queryClient} from '../../components/layout/ProviderWrapper';
import {
  openSheet,
  sheetIds,
  useSheetState,
} from '../../components/sheets/ActionSheet';
import {CopyToTagSheet, MoveToTagSheet} from '../../components/sheets/TagSheet';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import Icons from '../../components/ui/vector-icons';
import {colors} from '../../constants/colors';
import {api} from '../../libs/api';
import {ldbValues} from '../../libs/localDB';
import tw from '../../libs/tailwind';
import {useContentState} from '../../libs/zustand';

export default function SelectedActionBar() {
  const {selectedIds, selectedTag, selectedTagId, contentType, setSelectedIds} =
    useContentState();
  const userId = ldbValues.getUserId();

  const handleInvertSelectAllContents = async () => {};

  const actions = [
    {
      label: 'All',
      icon: 'select-all',
      iconSize: 30,
      onPress: async () => {
        const allItems = queryClient.getQueryData([
          'user-contents',
          {selectedTag, contentType, userId},
        ]);
        if (Array.isArray(allItems)) {
          setSelectedIds(allItems?.map(x => x.content._id));
        }
      },
    },
    {
      label: 'None',
      icon: 'deselect',
      iconSize: 30,
      onPress: async () => {
        setSelectedIds([]);
      },
    },
    {
      label: 'Copy',
      icon: 'content-copy',
      iconSize: 28,
      onPress: async () => {
        openSheet(sheetIds.copy_tag_content_sheet);
      },
    },
    {
      label: 'Move',
      icon: 'drive-file-move-outline',
      iconSize: 30,
      onPress: async () => {
        openSheet(sheetIds.move_tag_content_sheet);
      },
    },
    {
      label: 'Delete',
      icon: 'delete-outline',
      iconSize: 30,
      onPress: async () => {
        Alert.alert(
          'Confirm deletion',
          'Do you really want to delete these contents?',
          [
            {
              isPreferred: true,
              text: 'No',
            },
            {
              isPreferred: false,
              text: 'Yes',
              onPress: async () => {
                try {
                  const res = await api.post('/content/delete-from-tag', {
                    tagId: selectedTagId,
                    userId,
                    contentIds: selectedIds,
                  });
                  ToastAndroid.show(res.data.message, 500);
                } catch (err) {
                  ToastAndroid.show(String(err), 500);
                }
              },
            },
          ],
        );
      },
    },
  ].filter(x => {
    if (selectedTagId === '' && x.label === 'Move') {
      return false;
    }
    return true;
  });

  console.log(useSheetState.getState());
  if (selectedIds.length == 0) return null;
  return (
    <TView style={tw`mt-4 border border-primary p-2 rounded-lg`}>
      <TView
        stack="hStack"
        alignItems="center"
        justifyContent="around"
        style={tw`flex-wrap`}>
        {actions.map((x, i: number) => {
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.5}
              style={tw`items-center`}
              onPress={() => {
                x.onPress();
                // Vibration.vibrate(1000);
              }}>
              <Icons.MaterialIcons
                name={x.icon}
                color={colors.primary}
                size={x.iconSize}
                style={tw`h-8`}
              />
              <TText style={tw`text-xs font-semibold text-green-50`}>
                {x.label}
              </TText>
            </TouchableOpacity>
          );
        })}
      </TView>
      <CopyToTagSheet />
      <MoveToTagSheet />
    </TView>
  );
}
