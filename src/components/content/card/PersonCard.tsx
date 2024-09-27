import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {router} from '../../../libs/navigation/navigator';
import tw from '../../../libs/tailwind';
import {getProfileImageURL} from '../../../libs/tmdb';
import TImage from '../../ui/TImage';

export default function PersonCard({data: item, style}: any) {
  if (!item.profile_path) {
    return null;
  }
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        router.navigate('person_details', {id: item.id, data: item});
      }}
      style={[tw` rounded-lg  gap-1  items-center justify-center `, style]}>
      <TImage
        style={tw` h-40 w-28 rounded-md`}
        source={{uri: getProfileImageURL(item.profile_path, 'w185')}}
      />
      <Text
        style={tw` text-white bg-black/50 w-full p-2 absolute bottom-0 text-sm text-center flex-1`}>
        {item.name}
      </Text>
      {/* <View style={tw`px-2`}>
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
      </View> */}
    </TouchableOpacity>
  );
}
