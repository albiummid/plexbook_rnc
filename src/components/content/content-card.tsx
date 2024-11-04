import {useMemo} from 'react';
import {getPosterImageURL, getProfileImageURL} from '../../libs/tmdb';
import {useContentState} from '../../libs/zustand';
import {TouchableOpacity} from 'react-native';
import {router} from '../../libs/navigation/navigator';
import TImage from '../ui/TImage';
import TText from '../ui/TText';
import tw from '../../libs/tailwind';

export const ContentCard = ({data}: any) => {
  const {selectedIds, toggleItem} = useContentState();
  const contentType = data.content.contentType;
  // useContentState.setState({contentType});
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
