import {View, Text} from 'react-native';
import React from 'react';

export default function ContentList({...props}) {
  const {tagId} = props.route.params;

  return (
    <View>
      <Text>ContentList</Text>
    </View>
  );
}
