import React, {useEffect, useRef, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import YTPlayer, {PLAYER_STATES} from 'react-native-youtube-iframe';
import tw from '../../../libs/tailwind';
import {useContentVideos} from '../../../libs/tmdb';
import {hp, wp} from '../../../libs/utils/Scaling';
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
  const [noVideo, setNoVideo] = useState(false);
  useEffect(() => {
    if (videoList?.results.length && playlist.length == 0) {
      const list = videoList?.results
        .filter(x => x.site === 'YouTube')
        .reverse();

      setActiveItem(list[0]?.key);
      setPlaylist(list);
    }
  }, [playlist, videoList]);

  const ref = useRef(null);

  if (videoReq.isSuccess && videoList?.results.length === 0) return null;

  return (
    <Section labelColor="white" label="Trailers">
      <View style={tw` gap-1`}>
        <View
          style={tw.style(!noVideo && `border border-primary rounded-lg p-1`)}>
          <YTPlayer
            onError={e => {
              if (playlist.length == 0) {
                setNoVideo(true);
                return;
              }
              if (playlist.length == 1) {
                setNoVideo(true);
              }
              setPlaylist(pv => pv.filter(x => x.key !== activeItem));
              let index = playlist.findIndex((x: any) => x?.key === activeItem);
              if (index + 1 === playlist.length) {
                return;
              } else {
                setActiveItem(playlist[index + 1]?.key);
              }
            }}
            webViewStyle={{aspectRatio: 16 / 9, padding: 5}}
            videoId={activeItem}
            onChangeState={e => {
              setPlayerState(e);
            }}
            ref={ref}
          />
          <Image
            source={require('../../../assets/images/no-poster.png')}
            style={tw.style(
              `w-full h-full absolute rounded-lg`,
              !noVideo && 'hidden',
            )}
          />
        </View>
        <ScrollView horizontal style={tw`mt-2 `}>
          {playlist?.map((x, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setActiveItem(x.key);
              }}>
              <TText
                style={tw` mr-2 rounded-lg text-white px-2 py-1 ${
                  x.key === activeItem
                    ? 'border-primary border  text-primary'
                    : 'border-black'
                }`}>
                {x.name}
              </TText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Section>
  );
}
