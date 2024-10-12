import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {router} from '../../../libs/navigation/navigator';
import tw from '../../../libs/tailwind';
import {Genre} from '../../../types/contents/series.types';
import TScrollView from '../../ui/TScrollView';
import TText from '../../ui/TText';
import TView from '../../ui/TView';

export default function GenreSection({
  genres,
  contentKind,
  style,
}: {
  genres: Genre[];
  contentKind: 'movie' | 'tv';
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TView style={[tw`mt-2`, style]}>
      <TScrollView horizontal style={tw`gap-2`}>
        {genres?.map(x => {
          return (
            <TouchableOpacity
              key={x?.id}
              onPress={() => {
                router.navigate('genre_list', {id: x.id, contentKind});
              }}>
              <TText
                style={tw`text-xs mr-2 px-2 py-1 rounded-lg border text-primary border-primary `}>
                {x?.name}
              </TText>
            </TouchableOpacity>
          );
        })}
      </TScrollView>
    </TView>
  );
}
