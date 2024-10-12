import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {router} from '../../../libs/navigation/navigator';
import tw from '../../../libs/tailwind';
import {Genre} from '../../../types/contents/series.types';
import Section from '../../Section';
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
    <Section label="Genres">
      <TView style={[tw`mx-2 items-center flex-row flex-wrap`, style]}>
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
      </TView>
    </Section>
  );
}
