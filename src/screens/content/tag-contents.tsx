import {View, Text, ActivityIndicator} from 'react-native';
import React, {useMemo} from 'react';
import {useAuthState} from '../../libs/zustand';
import {useQuery} from '@tanstack/react-query';
import {api} from '../../libs/api';
import {useGetInfiniteList} from '../../libs/api/queries';
import {FlashList} from '@shopify/flash-list';
import {ContentCard} from '../../components/content/content-card';
import tw from '../../libs/tailwind';
import TText from '../../components/ui/TText';
import Header from '../../components/layout/Header';
import Fallback from '../../components/ui/ScreenFallback';
import SelectedActionBar from '../profile/SelectedActionBar';

export default function TagContents({...props}) {
  const {tagId, contentKind} = props.route.params;
  const {userId} = useAuthState();

  const {data: tagDetails} = useQuery({
    queryKey: ['tag-detailss'],
    queryFn: async () => {
      const {data} = await api.get('/content/tag/' + tagId);
      return data.result;
    },
  });

  const {flattedData: userContentData, ...userContentReq} = useGetInfiniteList(
    '/content/user/list',
    {
      userId,
      tags: tagDetails?.value,
      cType: contentKind,
      _limit: 12,
    },
    {
      enabled: Boolean(userId && contentKind && tagDetails?.value),
    },
  );

  let totalItems = useMemo(
    () => userContentReq.data?.pages[0]?.pagination?.totalItems || 0,
    [userContentReq],
  );

  if (!userContentReq.isSuccess) {
    return (
      <Fallback
        isLoading={userContentReq.isLoading}
        error={userContentReq.error}
      />
    );
  }

  return (
    <View style={tw`flex-1 p-2 bg-black`}>
      <Header />
      <SelectedActionBar />
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
        ListHeaderComponent={
          <View style={tw` flex-row justify-around`}>
            <View>
              <TText>
                Category -{' '}
                <TText style={tw`font-semibold`}>{tagDetails?.label}</TText>
              </TText>
              <TText>
                Contents - <TText style={tw`font-semibold`}>{totalItems}</TText>
              </TText>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={tw`mb-20`}>
            {userContentReq.isFetchingNextPage && <ActivityIndicator />}
          </View>
        }
      />
    </View>
  );
}
