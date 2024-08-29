import React from 'react';
import {Text, View} from 'react-native';
import {ScreenProps} from '../../navigation/Screens';

export default function PersonDetailScreen(
  props: ScreenProps<'person_details'>,
) {
  const {id, data} = props.route.params;
  return (
    <View>
      <Text>PersonDetailScreen</Text>
    </View>
  );
}
