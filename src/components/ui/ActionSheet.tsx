import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {Text} from 'react-native';
import ActionSheet, {
  ActionSheetProps,
  ActionSheetRef,
  registerSheet,
  SheetDefinition,
  SheetManager,
} from 'react-native-actions-sheet';
import tw from '../../libs/tailwind';

registerSheet('bookmark-sheet', BookmarkSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'bookmark-sheet': SheetDefinition;
  }
}

function BookmarkSheet() {
  const ref = useRef(null);
  console.log();
  return (
    <ActionSheet
      closable={false}
      closeOnPressBack
      onClose={() => {
        SheetManager.hide('bookmark-sheet');
      }}
      containerStyle={tw` p-2`}>
      <Text
        onPress={() => {
          SheetManager.hide('bookmark-sheet');
        }}>
        Close
      </Text>
    </ActionSheet>
  );
}

export const RNActionSheet = (
  props: PropsWithChildren<ActionSheetProps> & {
    isOpen: boolean;
  },
) => {
  const sheetRef = useRef<ActionSheetRef | null>(null);
  useEffect(() => {
    if (props.isOpen) {
      sheetRef.current?.show();
    } else if (sheetRef.current?.isOpen()) {
      sheetRef.current?.hide();
    }
  }, [props.isOpen]);

  return (
    <>
      <ActionSheet ref={sheetRef} {...props}>
        {props.children}
      </ActionSheet>
    </>
  );
};
export {};
