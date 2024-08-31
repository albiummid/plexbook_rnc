import React, {useRef, useState} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import tw from '../../libs/tailwind';
import {ContentKind} from '../../types/common';
import TText from '../ui/TText';
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
  const sheetRef = useRef(null);
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
          name="heart"
          size={20}
          style={tw.style(
            ` mr-auto p-2 rounded-full`,
            saved ? 'bg-primary text-white' : 'text-primary bg-white',
          )}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setWatched(v => !v);
        }}>
        <Icons.Feather
          name={watched ? 'eye' : 'eye-off'}
          size={20}
          style={tw.style(
            ` mr-auto p-2 rounded-full`,
            watched ? 'bg-primary text-white' : 'text-primary bg-white',
          )}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          sheetRef.current?.show();
        }}>
        <Icons.MaterialIcons
          name="playlist-add"
          size={20}
          style={tw.style(` mr-auto p-2 rounded-full bg-primary text-white  `)}
        />
      </TouchableOpacity>

      {/* <ActionS */}
      <ActionSheet ref={sheetRef}>
        <TText>HELLO WORLD</TText>
      </ActionSheet>
    </View>
  );
}
