import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import YTPlayer, {PLAYER_STATES} from 'react-native-youtube-iframe';
import tw from '../../../libs/tailwind';
import {useContentVideos} from '../../../libs/tmdb';
import {wp} from '../../../libs/utils/Scaling';
import Section from '../../Section';
import TText from '../../ui/TText';

export default function TrailerSection(props: {
  contentKind: 'movie' | 'tv';
  contentId: number;
}) {
  const {data: videoList, ...videoReq} = useContentVideos(
    props.contentId,
    props.contentKind,
  );

  const [playerState, setPlayerState] = useState(PLAYER_STATES.UNSTARTED);
  const [activeItem, setActiveItem] = useState('');
  const [playlist, setPlaylist] = useState<any[]>([]);
  useEffect(() => {
    if (videoList?.results.length && playlist.length == 0) {
      const list = videoList?.results.filter(x => x.site === 'YouTube');

      setActiveItem(list[0].key);
      setPlaylist(list);
    }
  }, [playlist, videoList]);

  const ref = useRef(null);

  if (videoReq.isSuccess && videoList?.results.length === 0) return null;

  return (
    <Section labelColor="white" label="Trailers">
      <View style={tw`rounded-lg border border-primary mx-2 p-2`}>
        <YTPlayer
          onError={e => {
            if (playlist.length == 0) {
              return;
            }
            let index = playlist.findIndex((x: any) => x.key === activeItem);
            if (index + 1 === playlist.length) {
              setActiveItem(playlist[0]?.key);
            } else {
              setActiveItem(playlist[index + 1]?.key);
            }
          }}
          webViewStyle={tw`rounded-lg`}
          height={wp(50)}
          videoId={activeItem}
          onChangeState={e => {
            setPlayerState(e);
          }}
          ref={ref}
        />
        <ScrollView horizontal style={tw`mt-2 `}>
          {playlist?.map(x => (
            <TouchableOpacity
              key={x.key}
              onPress={() => {
                setActiveItem(x.key);
              }}>
              <TText
                style={tw` mr-2 rounded-lg text-white px-2 py-1 ${
                  x.key === activeItem
                    ? 'border-primary border  text-primary'
                    : 'border-black'
                }`}
                key={x.key}>
                {x.name}
              </TText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Section>
  );
}
