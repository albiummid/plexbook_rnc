import React from 'react';
import {ScrollView, StyleProp, Text, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {router} from '../../../libs/navigation/navigator';
import tw from '../../../libs/tailwind';
import {Genre} from '../../../types/contents/series.types';
import Section from '../../Section';
import TText from '../../ui/TText';
import TView from '../../ui/TView';
import ToggleButton from '../../ui/ToggleButton';

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
    <TView style={[tw`flex-row flex-wrap pr-5`, style]}>
      {genres?.map((x, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              router.navigate('genre_list', {id: x.id, contentKind});
            }}
            key={i}>
            <TText style={tw` text-primary text-xs font-semibold`}>
              {i !== 0 && (
                <TText style={tw` text-primary font-semibold text-xs`}>
                  {' '}
                  |{' '}
                </TText>
              )}
              {x?.name}
            </TText>
          </TouchableOpacity>
        );
      })}
    </TView>
  );
}
