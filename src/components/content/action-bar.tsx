import React, {useState} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import tw from '../../lib/tailwind';
import {ContentKind} from '../../types/common';
import Icons from '../ui/vector-icons';

type ActionBarProps = {
  contentKind: ContentKind;
  id: number;
  style?: StyleProp<ViewStyle>;
};

export default function ContentActionBar({
  contentKind,
  id,
  style,
}: ActionBarProps) {
  const [watched, setWatched] = useState(false);
  const [saved, setSaved] = useState(false);
  //   const checkStatus = () => {
  //     setWatched(
  //       isExistInList(DefaultListKind.WatchedList, content.id, content_kind),
  //     );
  //     setSaved(
  //       isExistInList(DefaultListKind.SavedList, content.id, content_kind),
  //     );
  //   };
  //   useEffect(() => {
  //     checkStatus();
  //   }, [content, content_kind]);
  return (
    <View style={[tw.style(`flex-row gap-2`), style]}>
      <TouchableOpacity
        onPress={() => {
          setSaved(v => !v);
        }}>
        <Icons.Feather
          name="bookmark"
          size={20}
          style={tw.style(
            ` mr-auto p-2 rounded-full`,
            saved ? 'bg-cyan-400 text-white' : 'text-cyan-400 bg-white',
          )}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setWatched(v => !v);
        }}>
        <Icons.Feather
          name="check"
          size={20}
          style={tw.style(
            ` mr-auto p-2 rounded-full`,
            watched ? 'bg-pink-400 text-white' : 'text-pink-400 bg-white',
          )}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Icons.MaterialIcons
          name="playlist-add"
          size={20}
          style={tw.style(
            ` mr-auto p-2 rounded-full bg-purple-400 text-white  `,
          )}
        />
      </TouchableOpacity>
    </View>
  );
}
