import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import tw from '../../../lib/tailwind';
import {useContentVideos} from '../../../lib/tmdb';
import {wp} from '../../../lib/utils/Scaling';
import Section from '../../Section';

export default function TrailerSection(props: {
  contentKind: 'movie' | 'tv';
  contentId: number;
}) {
  const {data: videoList, ...videoReq} = useContentVideos(
    props.contentId,
    props.contentKind,
  );

  return (
    <Section labelColor="white" label="Trailers">
      {videoReq.isLoading && <ActivityIndicator />}
      <FlatList
        horizontal
        data={videoList?.results}
        renderItem={({item}) => {
          if (item.site !== 'YouTube') return null;
          return (
            <View style={tw`rounded-lg border border-primary mx-2 p-1 `}>
              <YoutubePlayer
                webViewStyle={tw`rounded-lg`}
                height={wp(50)}
                width={wp(90)}
                videoId={item.key}
              />
            </View>
          );
        }}
      />
    </Section>
  );
}
