import {useQueries} from '@tanstack/react-query';
import React, {useMemo} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import CreateAndUpdateTagSheet from '../../components/sheets/TagSheet';
import TImage from '../../components/ui/TImage';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import TabGroupButtons from '../../components/ui/TabGroupButtons';
import {api} from '../../libs/api';
import {ldbValues} from '../../libs/localDB';
import {router} from '../../libs/navigation/navigator';
import tw from '../../libs/tailwind';
import {getPosterImageURL} from '../../libs/tmdb';
import {useContentState} from '../../libs/zustand';
import SelectedActionBar from './SelectedActionBar';
import TagSection from './TagSection';

export default function ContentSection() {
  const userId = ldbValues.getUserId();
  const {contentType, selectedTag, setContentType} = useContentState();
  const subTabItems = useMemo(
    () => [
      {
        // label: `Movies (${selectedList.movieList.length})`,
        label: `Movies `,
        value: 'movie',
      },
      {
        // label: `TV Series (${selectedList.tvList.length})`,
        label: `TV Series `,
        value: 'tv',
      },
    ],
    [],
  );

  const [{data: userContents, ...userContentsReq}, {data: tagList}] =
    useQueries({
      queries: [
        {
          queryKey: ['user-contents', {userId, contentType, selectedTag}],
          queryFn: async () => {
            const {data} = await api.get(
              `/content/list?userId=${userId}&_limit=100&cType=${contentType}${
                selectedTag ? `&tags=${selectedTag?.value}` : ''
              }`,
            );

            return data.result.list;
          },
          refetchOnWindowFocus: true,
        },
        {
          queryKey: ['tag-list', {userId}],
          queryFn: async () => {
            const {data} = await api.get(`/content/tag/list/${userId}`);
            return data.result;
          },
        },
      ],
    });

  return (
    <TView style={tw`mt-5 flex-1 `}>
      <TabGroupButtons
        containerStyle={tw`mx-auto `}
        tabItems={subTabItems}
        activeItem={contentType}
        textStyle={tw`text-white`}
        onChange={v => {
          setContentType(v as any);
        }}
      />

      <View>
        <TagSection />
        <SelectedActionBar />
        <CreateAndUpdateTagSheet />
      </View>

      <FlatList
        data={userContents}
        numColumns={3}
        style={tw`mt-5`}
        contentContainerStyle={tw`gap-5`}
        columnWrapperStyle={tw`gap-5  `}
        renderItem={({item, index}) => {
          return <ContentCard data={item} index={index} />;
        }}
      />
    </TView>
  );
}

const ContentCard = ({data}: any) => {
  const {selectedIds, toggleItem} = useContentState();
  const posterURI =
    data?.content?.posterPath?.length > 0
      ? getPosterImageURL(data?.content?.posterPath, 'w185')
      : Image.resolveAssetSource(
          require('../../assets/images/poster_fallback.png'),
        ).uri;
  const isSelected = useMemo(
    () => selectedIds.includes(data.content._id),
    [selectedIds, data],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onLongPress={d => {
        toggleItem(data.content._id);
      }}
      onPress={() => {
        if (selectedIds.length > 0) {
          toggleItem(data.content._id);
        } else {
          router.push(
            data.content.contentType === 'movie'
              ? 'movie_details'
              : 'series_details',
            {
              id: data.content.tmdbId,
              data: {poster_path: data.content.posterPath},
            },
          );
        }
      }}
      style={tw.style(
        `flex-1 max-w-26`,
        isSelected && `border border-primary rounded-lg`,
      )}>
      <TImage
        source={{
          uri: posterURI,
        }}
        style={tw`h-40  rounded-lg`}
      />
      <TText style={tw`text-white text-xs  text-center mt-2`}>
        {data.content?.label}
      </TText>
    </TouchableOpacity>
  );
};
