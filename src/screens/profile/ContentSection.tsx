import {FlashList} from '@shopify/flash-list';
import React, {useMemo} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import CreateAndUpdateTagSheet from '../../components/sheets/TagSheet';
import TImage from '../../components/ui/TImage';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import TabGroupButtons from '../../components/ui/TabGroupButtons';
import {useGetInfiniteList, useTagList} from '../../libs/api/queries';
import {ldbValues} from '../../libs/localDB';
import {router} from '../../libs/navigation/navigator';
import tw from '../../libs/tailwind';
import {getPosterImageURL, getProfileImageURL} from '../../libs/tmdb';
import {useContentState} from '../../libs/zustand';
import SelectedActionBar from './SelectedActionBar';
import TagSection from './TagSection';

export default function ContentSection() {
  const userId = ldbValues.getUserId();
  const {contentType, selectedTag, setContentType, setSelectedTag} =
    useContentState();
  const subTabItems = [
    {
      label: `Movies `,
      value: 'movie',
    },
    {
      label: `TV Series `,
      value: 'tv',
    },
    {
      label: 'Person',
      value: 'person',
    },
  ];

  const {flattedData: userContentData, ...userContentReq} = useGetInfiniteList(
    '/content/user/list',
    {
      userId,
      tags: selectedTag?.value,
      cType: contentType,
      _limit: 12,
    },
    {
      enabled: Boolean(userId && contentType),
    },
  );

  const {data: tagList, ...tagListReq} = useTagList(userId);

  return (
    <TView style={tw`mt-5 flex-1 `}>
      <TabGroupButtons
        containerStyle={tw`mx-auto `}
        tabItems={subTabItems}
        activeItem={contentType}
        textStyle={tw`text-white`}
        onChange={v => {
          setContentType(v as any);
          if (v === 'person') {
            setSelectedTag(tagList.find((x: any) => x.value === 'favorite'));
          }
        }}
      />

      <View>
        <TagSection />
        <SelectedActionBar />
        <CreateAndUpdateTagSheet />
      </View>

      <FlashList
        removeClippedSubviews
        data={userContentData}
        numColumns={3}
        // contentContainerStyle={tw`bg-red-400`}
        estimatedItemSize={40}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (userContentReq.hasNextPage) {
            userContentReq.fetchNextPage();
          }
        }}
        renderItem={({item, index}) => {
          return <ContentCard data={item} index={index} />;
        }}
        ListHeaderComponent={<View style={tw`mt-2`}></View>}
        ListFooterComponent={
          <View style={tw`mb-20`}>
            {userContentReq.isFetchingNextPage && <ActivityIndicator />}
          </View>
        }
      />
    </TView>
  );
}

const ContentCard = ({data}: any) => {
  const {selectedIds, toggleItem} = useContentState();
  const contentType = data.content.contentType;
  const posterURI =
    contentType === 'person'
      ? getProfileImageURL(data?.content?.imagePath, 'w154')
      : getPosterImageURL(data?.content?.imagePath, 'w185');
  const isSelected = useMemo(
    () => selectedIds?.includes(data?.content?._id),
    [selectedIds, data],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onLongPress={d => {
        toggleItem(data?.content._id);
      }}
      onPress={() => {
        if (selectedIds.length > 0) {
          toggleItem(data.content._id);
        } else {
          router.push(
            contentType === 'movie'
              ? 'movie_details'
              : contentType === 'tv'
              ? 'series_details'
              : contentType === 'person'
              ? 'person_details'
              : 'tab_home',
            {
              id: data.content.tmdbId,
            },
          );
        }
      }}
      style={tw.style(
        `flex-1 max-w-26 my-2 mx-auto`,
        isSelected && `border border-primary rounded-lg`,
      )}>
      <TImage
        source={{
          uri: posterURI,
        }}
        style={tw`h-36 w-24  rounded-lg`}
      />
      <TText style={tw`text-white text-xs  text-center mt-2`}>
        {data?.content?.label}
      </TText>
    </TouchableOpacity>
  );
};
