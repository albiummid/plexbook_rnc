import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import tw from '../../../lib/tailwind';
import {getGenreList} from '../../../lib/tmdb';
import {router} from '../../../navigation/navigator';
import {routes} from '../../../navigation/Screens';
import TScrollView from '../../ui/TScrollView';
import TText from '../../ui/TText';
import TView from '../../ui/TView';

export default function GenreSection({
  genreIds,
  contentKind,
  style,
}: {
  genreIds: number[];
  contentKind: 'movie' | 'tv';
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TView style={[tw`mt-2`, style]}>
      <TScrollView horizontal style={tw`gap-2`}>
        {getGenreList(genreIds).map(x => {
          return (
            <TouchableOpacity
              key={x?.id}
              onPress={() => {
                router.navigate(routes.genre_list, {id: x.id, contentKind});
              }}>
              <TText
                style={tw`text-xs mr-2 px-2 py-1 rounded-lg border border-primary `}
                color={'white'}>
                {x?.name}
              </TText>
            </TouchableOpacity>
          );
        })}
      </TScrollView>
    </TView>
  );
}
