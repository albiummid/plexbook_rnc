import React from 'react';
import {ScrollView, View} from 'react-native';
import CreateAndUpdateTagSheet, {
  openTagCreatingSheet,
  openTagUpdatingSheet,
} from '../../components/sheets/TagSheet';
import ToggleButton from '../../components/ui/ToggleButton';
import {useTagList} from '../../libs/api/queries';
import {ldbValues} from '../../libs/localDB';
import tw from '../../libs/tailwind';
import {useContentState} from '../../libs/zustand';

export default function TagSection() {
  const userId = ldbValues.getUserId();
  const {data: tagList, ...tagListReq} = useTagList(userId);
  const {selectedTag, setSelectedTag, selectedTagId, selectedIds, contentType} =
    useContentState();

  if (selectedIds.length > 0 || contentType === 'person') return null;
  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={tw`mt-5`}
        horizontal>
        <>
          <ToggleButton
            onPress={() => {
              setSelectedTag(null);
            }}
            isActive={selectedTag === null}>
            All
          </ToggleButton>
          {tagList?.map((x: any) => {
            const isActive = selectedTagId === x._id;
            return (
              <ToggleButton
                onLongPress={() => {
                  if (
                    !['Watched', 'Watch Later', 'Favorite'].includes(x.label)
                  ) {
                    openTagUpdatingSheet(x);
                  }
                }}
                style={tw`ml-2`}
                onPress={() => {
                  setSelectedTag(isActive ? null : x);
                }}
                isActive={isActive}
                key={x._id}>
                {x?.label}
              </ToggleButton>
            );
          })}
          <ToggleButton
            style={tw`ml-2`}
            onPress={() => {
              openTagCreatingSheet();
            }}>
            + Add Tag
          </ToggleButton>
        </>
      </ScrollView>
      <CreateAndUpdateTagSheet />
    </View>
  );
}
