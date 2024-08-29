import moment from 'moment';
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import tw from '../../../lib/tailwind';
import {getImageURL} from '../../../lib/tmdb';
import {router} from '../../../navigation/navigator';

export default function PersonCard({...item}: any) {
  const genderMap = {
    1: 'Female',
    2: 'Male',
  };
  const gender = genderMap[item.gender as 1 | 2] ?? 'Unknown';

  if (!item.profile_path) {
    return null;
  }
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        router.navigate('person_details', {id: item.id, data: item});
      }}
      style={tw` rounded-lg mr-auto bg-slate-200 p-2 flex-row gap-5 `}>
      <Image
        style={tw` h-40 w-28 rounded-md`}
        source={{uri: getImageURL(item.profile_path)}}
      />
      <View style={tw`px-2`}>
        <Text style={tw` text-sm`}>Name: {item.name}</Text>
        <Text style={tw`text-sm`}>Gender : {gender[item.gender]}</Text>
        <Text style={tw`text-sm`}>
          Popularity Rank: {Number(item.popularity).toFixed(0)}
        </Text>
        <Text style={tw`text-sm`}>Known for:</Text>
        <ScrollView style={tw``}>
          {item.known_for.map((x: any, idx: number) => {
            return (
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  const path = item.media_type === 'movie' ? 'Movie' : 'TVShow';
                  navigate(`${path}Details`, {id: item.id});
                }}>
                <Text style={tw`w-64 text-sm ml-5  mb-2`}>
                  {idx + 1} .{' '}
                  <Text style={tw`underline`}>
                    {x.title} ({' ' + moment(x.release_date).format('YYYY')})
                  </Text>
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}