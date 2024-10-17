import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  openSheet,
  RNActionSheet,
  useSheetState,
} from '../../sheets/ActionSheet';
import Icons from '../../ui/vector-icons';
import tw from '../../../libs/tailwind';
import TText from '../../ui/TText';
import ContentActionBar from '../action-bar';

export default function CardActionBar({
  ...props
}: {
  contentKind: string;
  id: number;
  data: any;
}) {
  const saveContentSheetId = `save-content-${props.data.id}`;

  return (
    <>
      <View style={tw`flex-row gap-2`}>
        <TouchableOpacity
          style={tw`mr-auto`}
          onPress={() => {
            openSheet(saveContentSheetId, {
              contentKind: props.contentKind,
              data: props.data,
            });
          }}>
          <Icons.Feather name="bookmark" style={tw`text-primary text-2xl`} />
        </TouchableOpacity>
      </View>

      {/* Sheets */}
      <SaveToTagSheet sheetId={saveContentSheetId} />
    </>
  );
}

const SaveToTagSheet = ({sheetId}: {sheetId: string}) => {
  const sheetProps = useSheetState().getSheetProps(sheetId);

  return (
    <RNActionSheet
      containerStyle={tw`bg-black border border-primary border-b-0 p-2 gap-y-2`}
      sheetId={sheetId}>
      <TText style={tw`text-center font-bold`}>
        {sheetProps?.contentKind == 'movie' ? (
          <TText>Save movie "{sheetProps?.data?.title}" to</TText>
        ) : sheetProps?.contentKind === 'tv' ? (
          <TText>Save series {sheetProps?.data?.name}</TText>
        ) : sheetProps?.contentKind == 'person' ? (
          <TText>Save person as favorite {sheetProps?.data?.name}</TText>
        ) : (
          <TText>Save collection {sheetProps?.data?.name}</TText>
        )}
      </TText>
      <ContentActionBar
        data={sheetProps?.data}
        contentKind={sheetProps?.contentKind}
        id={sheetProps?.data?.id}
        style={tw`mx-auto mt-5`}
      />
    </RNActionSheet>
  );
};
