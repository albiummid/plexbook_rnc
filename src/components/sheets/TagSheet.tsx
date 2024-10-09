import React from 'react';
import {Alert, TextInput, ToastAndroid, View} from 'react-native';
import {create} from 'zustand';
import {api} from '../../libs/api';
import {useTagList} from '../../libs/api/queries';
import {ldbValues} from '../../libs/localDB';
import tw from '../../libs/tailwind';
import {useContentState} from '../../libs/zustand';
import {queryClient} from '../layout/ProviderWrapper';
import TButton from '../ui/TButton';
import TText from '../ui/TText';
import TView from '../ui/TView';
import {
  closeSheet,
  openSheet,
  RNActionSheet,
  sheetIds,
  useSheetState,
} from './ActionSheet';

interface tagState {
  currentTag: null | any;
  setCurrentTag: (v: any) => void;
  tagInput: string;
  setTagInput: (v: string) => void;
  error: string;
  setError: (v: string) => void;
}

export const useTagState = create<tagState>(set => ({
  //
  currentTag: null,
  setCurrentTag: tag => set({currentTag: tag}),
  //
  tagInput: '',
  setTagInput: value => set({tagInput: value}),
  //
  error: '',
  setError: error => set({error}),
}));

export const openTagCreatingSheet = () => {
  useSheetState.getState().openSheet(sheetIds.tag_create_sheet);
};
export const openTagUpdatingSheet = (currentTag: any) => {
  useSheetState.getState().openSheet(sheetIds.tag_update_sheet);
  useTagState.setState({currentTag, tagInput: currentTag.label});
};
export const closeTagSheet = () => {
  useSheetState.getState().closeSheet(sheetIds.tag_create_sheet);
  useSheetState.getState().closeSheet(sheetIds.tag_update_sheet);
  useTagState.setState({currentTag: null, error: '', tagInput: ''});
};

export default function CreateAndUpdateTagSheet() {
  const {currentTag, error, setError, setTagInput, tagInput} = useTagState();
  const userId = ldbValues.getUserId();
  const {data: tagList, ...tagListReq} = useTagList(userId);

  const handleCreateTag = async () => {
    try {
      if (tagList.find((x: any) => x.label === tagInput)) {
        setError('This tag name already exists.');
        return;
      }
      await api.post(`/content/tag/create`, {
        userId,
        label: tagInput,
      });
      tagListReq.refetch();
      closeTagSheet();
    } catch (err) {
      setError('Something went wrong !');
    }
  };

  const handleUpdateTag = async () => {
    if (currentTag.label === tagInput) {
      setError('Tag name remain same');
      return;
    }
    try {
      await api.patch(`/content/tag/${currentTag._id}`, {
        userId,
        label: tagInput,
      });
      tagListReq.refetch();
      closeTagSheet();
    } catch (err) {
      console.log(err);
      setError('Something went wrong !');
    }
  };
  const handleDeleteTag = async () => {
    Alert.alert(
      `Delete tag "${currentTag.label}"`,
      `All content of ${currentTag.label} will be deleted`,
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await api.delete(`/content/tag/${currentTag._id}`);
            tagListReq.refetch();
            queryClient.invalidateQueries({queryKey: ['user-contents']});
            closeTagSheet();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
      ],
    );
  };

  return (
    <View>
      <RNActionSheet
        label={'Create Tag'}
        sheetId={sheetIds.tag_create_sheet}
        containerStyle={tw` rounded-t-3xl bg-gray-200 py-5 px-4`}>
        <View style={tw`my-2`}>
          <TText>Tag Name</TText>
          <TextInput
            autoFocus
            style={tw.style(
              `px-2 py-1 rounded-lg border my-1 `,
              error.length > 0 && 'border-red-400',
            )}
            placeholder="Enter a tag name"
            value={tagInput}
            onChangeText={v => {
              setError('');
              setTagInput(v);
            }}
          />
          {error.length > 0 && <TText style={tw`text-red-400`}>{error}</TText>}
        </View>
        <TButton
          onPress={handleCreateTag}
          disabled={tagInput.length == 0}
          textStyle={tw`w-full`}>
          Create Tag
        </TButton>
      </RNActionSheet>

      <RNActionSheet
        label="Rename tag"
        sheetId={sheetIds.tag_update_sheet}
        containerStyle={tw` rounded-t-3xl bg-gray-200 py-5 px-4`}
        // closeOnTouchBackdrop={false}
      >
        <View style={tw`my-2`}>
          <TText>Rename tag</TText>
          <TextInput
            autoFocus
            style={tw.style(
              `px-2 py-1 rounded-lg border my-1 `,
              error.length > 0 && 'border-red-400',
            )}
            placeholder="Enter a tag name"
            value={tagInput}
            onChangeText={v => {
              setError('');
              setTagInput(v);
            }}
          />
          {error.length > 0 && <TText style={tw`text-red-400`}>{error}</TText>}
        </View>
        <TView stack="hStack" justifyContent="center" gapX={10}>
          <TButton
            onPress={handleDeleteTag}
            textStyle={tw`w-full text-red-400  border-red-400`}>
            Delete Tag
          </TButton>
          <TButton
            onPress={handleUpdateTag}
            disabled={tagInput.length == 0}
            textStyle={tw`w-full`}>
            Update Tag
          </TButton>
        </TView>
      </RNActionSheet>
    </View>
  );
}

export function CopyToTagSheet() {
  const {selectedIds, setSelectedIds, setSelectedTag, selectedTag} =
    useContentState();
  const {data: tagList, ...tagListReq} = useTagList(ldbValues.getUserId());
  const handleCopyContents = async (tagId: string) => {
    try {
      const {data} = await api.post('/content/copy-between-tags', {
        tagId,
        userId: ldbValues.getUserId(),
        contentIds: selectedIds,
      });
      ToastAndroid.show(data?.message, 400);
      setSelectedIds([]);
      closeSheet(sheetIds.copy_tag_content_sheet);
      setSelectedTag(tagList.find(x => x._id === tagId));
    } catch (err) {
      ToastAndroid.show(String(err), 400);
    }
  };
  return (
    <>
      <RNActionSheet
        label="Choose tag for copying contents"
        sheetId={sheetIds.copy_tag_content_sheet}>
        <TView style={tw`flex-row flex-wrap gap-2 justify-center`}>
          {tagList?.map((x: any, index: number) => {
            if (x._id === selectedTag?._id) {
              return null;
            }
            return (
              <TButton key={index} onPress={() => handleCopyContents(x._id)}>
                <TText style={tw`text-xs`}>{x.label}</TText>
              </TButton>
            );
          })}
          <TButton onPress={() => openSheet(sheetIds.tag_create_sheet)}>
            <TText style={tw`text-xs`}>+ Create</TText>
          </TButton>
        </TView>
      </RNActionSheet>
    </>
  );
}
export function MoveToTagSheet() {
  const {selectedIds, setSelectedIds, selectedTagId, setSelectedTag} =
    useContentState();
  const {data: tagList, ...tagListReq} = useTagList(ldbValues.getUserId());
  const handleMoveContents = async (tagId: string) => {
    try {
      const {data} = await api.post('/content/move-between-tags', {
        tagFromId: selectedTagId,
        tagToId: tagId,
        userId: ldbValues.getUserId(),
        contentIds: selectedIds,
      });
      ToastAndroid.show(data?.message, 400);
      setSelectedIds([]);
      // for navigating to moved tag content list
      setSelectedTag(tagList.find(x => x._id === tagId));
      closeSheet(sheetIds.move_tag_content_sheet);
    } catch (err) {
      ToastAndroid.show(String(err), 400);
    }
  };

  return (
    <>
      <RNActionSheet
        label="Choose tag for moving contents"
        sheetId={sheetIds.move_tag_content_sheet}>
        <TView style={tw`flex-row flex-wrap gap-2 justify-center`}>
          {tagList?.map((x: any, index: number) => {
            console.log(selectedTagId, x._id);
            if (selectedTagId === x._id) {
              return null;
            }
            return (
              <TButton key={index} onPress={() => handleMoveContents(x._id)}>
                <TText style={tw`text-xs`}>{x.label}</TText>
              </TButton>
            );
          })}
          <TButton onPress={() => openSheet(sheetIds.tag_create_sheet)}>
            <TText style={tw`text-xs`}>+ Create</TText>
          </TButton>
        </TView>
      </RNActionSheet>
    </>
  );
}
