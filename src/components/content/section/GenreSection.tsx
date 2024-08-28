import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import tw from '../../../lib/tailwind';
import {getGenreList} from '../../../lib/tmdb';
import {router} from '../../../navigation/navigator';
import {routes} from '../../../navigation/Screens';
import TScrollView from '../../ui/TScrollView';
import TText from '../../ui/TText';

export default function GenreSection({
  genreIds,
  contentKind,
}: {
  genreIds: number[];
  contentKind: 'movie' | 'tv';
}) {
  return (
    <TScrollView horizontal style={tw`mt-5`}>
      {getGenreList(genreIds).map(x => {
        return (
          <TouchableOpacity
            key={x?.id}
            onPress={() => {
              router.navigate(routes.genre_list, {id: x.id, contentKind});
            }}>
            <TText
              style={tw`text-xs ml-2 px-2 py-1 rounded-lg border border-primary `}
              color={'white'}>
              {x?.name}
            </TText>
          </TouchableOpacity>
        );
      })}
    </TScrollView>
  );
}
