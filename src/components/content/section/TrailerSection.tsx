import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import YTPlayer, {PLAYER_STATES} from 'react-native-youtube-iframe';
import tw from '../../../lib/tailwind';
import {useContentVideos} from '../../../lib/tmdb';
import {wp} from '../../../lib/utils/Scaling';
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
      const list = videoList?.results.filter(
        x => x.type === 'Trailer' && x.site === 'YouTube',
      );

      setActiveItem(list[0].key);
      setPlaylist(list);
    }
  }, [playlist, videoList]);

  console.log(playlist);

  const ref = useRef(null);
  return (
    <Section labelColor="white" label="Trailers">
      <View style={tw`rounded-lg border border-primary mx-2 p-2`}>
        <YTPlayer
          onError={e => {
            let index = playlist.findIndex((x: any) => x.key === activeItem);
            if (index + 1 === playlist.length) {
              setActiveItem(playlist[0].key);
            } else {
              setActiveItem(playlist[index + 1].key);
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
