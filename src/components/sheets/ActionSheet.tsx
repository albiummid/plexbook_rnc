import React, {PropsWithChildren, useEffect, useMemo, useRef} from 'react';
import ActionSheet, {
  ActionSheetProps,
  ActionSheetRef,
} from 'react-native-actions-sheet';
import {create} from 'zustand';
import tw from '../../libs/tailwind';
import TText from '../ui/TText';
import TView from '../ui/TView';

interface ISheet {
  id: string;
  isOpen: boolean;
  sheetProps: any;
}
export interface sheetState {
  sheetList: ISheet[];
  openSheet: (id: string, sheetProps?: any) => void;
  closeSheet: (id: string) => void;
  reset: () => void;
}

const initialState = {
  sheetList: [],
};

export const useSheetState = create<sheetState>(set => ({
  ...initialState,
  closeSheet(id: string) {
    set(state => ({sheetList: state.sheetList.filter(x => x.id !== id)}));
  },
  openSheet(id, sheetProps) {
    set(state => {
      console.log(id, [
        ...state.sheetList.filter(x => x.id !== id),
        {
          id,
          isOpen: true,
          sheetProps,
        },
      ]);
      return {
        sheetList: [
          ...state.sheetList.filter(x => x.id !== id),
          {
            id,
            isOpen: true,
            sheetProps,
          },
        ],
      };
    });
  },
  reset() {
    set(initialState);
  },
}));

export const sheetIds = {
  tag_create_sheet: 'tag_create_sheet',
  tag_update_sheet: 'tag_update_sheet',
  copy_tag_content_sheet: 'copy_tag_content_sheet',
  move_tag_content_sheet: 'move_tag_content_sheet',
};

export const RNActionSheet = (
  props: PropsWithChildren<ActionSheetProps> & {
    sheetId: string;
    label: string;
    rightSection?: React.ReactNode;
  },
) => {
  const sheetRef = useRef<ActionSheetRef | null>(null);
  const {sheetList} = useSheetState();
  const sheet = useMemo(
    () => sheetList.find(x => x.id === props.sheetId),
    [sheetList],
  );
  useEffect(() => {
    if (sheet?.isOpen) {
      sheetRef.current?.show();
    } else {
      sheetRef.current?.hide();
    }
  }, [sheet]);

  return (
    <>
      <ActionSheet
        containerStyle={{...tw` p-2`, ...props.containerStyle}}
        onTouchBackdrop={() => {
          useSheetState.setState(state => ({
            sheetList: state.sheetList.filter(x => x.id !== props.sheetId),
          }));
        }}
        ref={sheetRef}
        {...props}>
        <TView stack="hStack" justifyContent="center">
          <TText style={tw`text-black font-bold my-2 text-base`}>
            {props.label}
          </TText>
          <TView>{props.rightSection}</TView>
        </TView>
        {props.children}
      </ActionSheet>
    </>
  );
};

export const {openSheet, closeSheet} = useSheetState.getState();
