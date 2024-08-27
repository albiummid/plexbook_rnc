import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import YoutubePlayer, {PLAYER_STATES} from 'react-native-youtube-iframe';
import tw from '../../../lib/tailwind';
import {useContentVideos} from '../../../lib/tmdb';
import {wp} from '../../../lib/utils/Scaling';
import Section from '../../Section';
import Skelton from '../../ui/Skelton';

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
  const [playlist, setPlaylist] = useState<string[]>([]);
  useEffect(() => {
    if (videoList?.results.length && playlist.length == 0) {
      const list = videoList?.results
        .filter(x => x.type === 'Trailer' && x.site === 'YouTube')
        .map(x => {
          return x.key;
        });
      setActiveItem(list[0]);
      setPlaylist(list);
    }
  }, [playlist, videoList]);

  const ref = useRef(null);
  return (
    <Section labelColor="white" label="Trailers">
      <View style={tw`rounded-lg border border-primary mx-2 p-1 h-56`}>
        <Skelton
          visible={videoReq.isSuccess}
          style={tw`w-full h-full rounded-lg`}>
          <YoutubePlayer
            onError={e => {
              console.log(e);
              let index = playlist.findIndex(x => x === activeItem);
              if (index + 1 === playlist.length) {
                setActiveItem(playlist[0]);
              } else {
                setActiveItem(playlist[index + 1]);
              }
            }}
            webViewStyle={tw`rounded-lg`}
            height={wp(50)}
            playList={playlist}
            videoId={activeItem}
            onChangeState={e => {
              setPlayerState(e);
            }}
            ref={ref}
          />
        </Skelton>
      </View>
    </Section>
  );
}
