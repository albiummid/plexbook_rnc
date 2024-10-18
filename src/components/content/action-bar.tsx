import {useQueries} from '@tanstack/react-query';
import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleProp,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import RNBouncyCheckbox from 'react-native-bouncy-checkbox';
import {colors} from '../../constants/colors';
import {api} from '../../libs/api';
import {ldbValues} from '../../libs/localDB';
import tw from '../../libs/tailwind';
import {labelToValue} from '../../libs/utils/helpers';
import {ContentKind} from '../../types/common';
import {queryClient} from '../layout/ProviderWrapper';
import TButton from '../ui/TButton';
import TText from '../ui/TText';
import TView from '../ui/TView';
import Icons from '../ui/vector-icons';
import ToggleButton from '../ui/ToggleButton';
import {
  closeSheet,
  openSheet,
  RNActionSheet,
  sheetIds,
} from '../sheets/ActionSheet';
type ActionBarProps = {
  contentKind: ContentKind;
  id: number;
  style?: StyleProp<ViewStyle>;
  data: any;
};

const ActionButton = ({
  isLoading,
  onPress,
  Icon,
  iconName,
  isEnabled,
}: {
  isLoading: boolean;
  onPress: () => void;
  Icon: any;
  iconName: string;
  isEnabled: boolean;
}) => {
  return (
    <TouchableOpacity disabled={isLoading} onPress={onPress}>
      <Icon
        name={iconName}
        size={20}
        style={tw.style(
          ` mr-auto p-2 rounded-full`,
          isEnabled ? 'bg-primary text-white' : 'text-primary bg-white',
          isLoading && ' opacity-80',
        )}
      />
    </TouchableOpacity>
  );
};

export default function ContentActionBar({
  contentKind,
  id,
  style,
}: ActionBarProps) {
  const userId = ldbValues.getUserId();
  const sheetRef = useRef(null);
  const [tagInput, setTagInput] = useState('');

  const [currentSheet, setCurrentSheet] = useState('list'); // list || create

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [
    {data: userContent, ...userContentReq},
    {data: tagList, ...tagListReq},
  ] = useQueries({
    queries: [
      {
        queryKey: ['user-content', {userId, contentKind, id}],
        enabled: Boolean(userId && contentKind),
        queryFn: async () => {
          const {data} = await api.get(
            `/content/user/list?userId=${userId}&tmdbId=${id}&cType=${contentKind}`,
          );
          return data.result.list[0] ?? null;
        },
      },
      {
        queryKey: ['tag-list', {userId}],
        queryFn: async () => {
          const {data} = await api.get(`/content/tag/list/${userId}`);
          return data.result;
        },
      },
    ],
  });

  const assignTag = async (tagLabel: string) => {
    return await api.post('/content/tag/assign', {
      userId,
      cType: contentKind,
      tagLabel,
      tmdbId: id,
    });
  };
  const removeTag = async (tagLabel: string) => {
    return await api.post('/content/tag/remove', {
      userId,
      cType: contentKind,
      tagLabel,
      tmdbId: id,
    });
  };
  const handleToggle = async (tagLabel: string, currentState: boolean) => {
    setIsLoading(true);
    try {
      if (userContentReq.isLoading) return;
      let res;
      if (currentState == true) {
        res = await removeTag(tagLabel);
      } else {
        res = await assignTag(tagLabel);
      }
      userContentReq.refetch();
      ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show(String(err), 500);
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorite = userContent?.tags?.includes(labelToValue('Favorite'));
  const isWatched = userContent?.tags?.includes(labelToValue('Watched'));
  const isWatchLater = userContent?.tags?.includes(labelToValue('Watch Later'));
  const loading = isLoading || userContentReq.isLoading;

  const handleCreateTag = async () => {
    try {
      if (tagList.find((x: any) => x.label === tagInput)) {
        setError('This tag name already exists.');
        return;
      }
      const {data} = await api.post(`/content/tag/create`, {
        userId,
        label: tagInput,
      });
      tagListReq.refetch();
      setTagInput('');
      setError('');
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      setCurrentSheet('list');
    } catch (err) {
      setError('Something went wrong !');
    }
  };

  const handleShareContent = async () => {
    // console.log('L');
  };

  if (!contentKind) return null;

  return (
    <View style={[tw.style(`flex-row gap-2`), style]}>
      <ActionButton
        isLoading={loading}
        isEnabled={isFavorite}
        onPress={() => {
          handleToggle('Favorite', isFavorite);
        }}
        Icon={Icons.Feather}
        iconName={contentKind === 'person' ? 'bookmark' : 'heart'}
      />

      {contentKind !== 'person' && (
        <>
          <ActionButton
            isLoading={loading}
            isEnabled={isWatched}
            onPress={() => {
              handleToggle('Watched', isWatched);
            }}
            Icon={Icons.Feather}
            iconName={isWatched ? 'eye' : 'eye-off'}
          />
          <ActionButton
            isLoading={loading}
            isEnabled={isWatchLater}
            onPress={() => {
              handleToggle('Watch Later', isWatchLater);
            }}
            Icon={Icons.Feather}
            iconName={'watch'}
          />

          <ActionButton
            isLoading={loading}
            isEnabled={false}
            onPress={() => {
              openSheet('assign-tag');
            }}
            Icon={Icons.Feather}
            iconName={'folder-plus'}
          />
        </>
      )}

      {/* <ActionButton
        isEnabled={false}
        onPress={handleShareContent}
        Icon={Icons.Feather}
        iconName="share-2"
      /> */}

      <RNActionSheet
        onClose={() => {
          setError('');
          setTagInput('');
          setCurrentSheet('list');
        }}
        containerStyle={tw`p-4 bg-black border border-b-0 border-primary`}
        sheetId="assign-tag">
        <TView
          // stack="hStack"
          // alignItems="center"
          gap={2}
          style={tw` pb-1`}
          justifyContent="between">
          <TView stack="hStack" justifyContent="between">
            <TText style={tw`text-base font-bold text-white `}>
              {currentSheet === 'list' ? 'Add to tag list' : 'Create tag'}
            </TText>
            <ToggleButton
              onPress={() => {
                closeSheet('assign-tag');
              }}>
              Close
            </ToggleButton>
          </TView>
        </TView>
        <View>
          {currentSheet === 'list' ? (
            <View style={tw`mt-5 flex-row gap-2 flex-wrap`}>
              {tagList?.map((x: any) => {
                const isAssigned = userContent?.tags?.includes(x.value);
                return (
                  <ToggleButton
                    key={x._id}
                    onPress={() => handleToggle(x.label, isAssigned)}
                    textStyle={tw`text-xs`}
                    isActive={isAssigned}>
                    {x.label}
                  </ToggleButton>
                );
              })}
              <ToggleButton
                textStyle={tw`text-xs`}
                onPress={() => {
                  setCurrentSheet('create');
                }}>
                {currentSheet !== 'list' ? 'Add to tag list' : '+ Create'}
              </ToggleButton>
            </View>
          ) : (
            <>
              <View style={tw`my-4`}>
                <TText style={tw`text-white`}>Tag Name</TText>
                <TextInput
                  cursorColor={'white'}
                  style={tw.style(
                    `px-2 py-1 rounded-lg border my-1 border-primary text-white  `,
                    error.length > 0 && 'border-red-400',
                  )}
                  autoFocus={true}
                  placeholder="Enter a tag name"
                  value={tagInput}
                  onChangeText={v => {
                    setError('');
                    setTagInput(v);
                  }}
                />
                {error.length > 0 && (
                  <TText style={tw`text-red-400`}>{error}</TText>
                )}
              </View>
              <View style={tw`flex-row justify-between`}>
                <ToggleButton
                  onPress={handleCreateTag}
                  // style={tw`mx-auto`}
                  disabled={tagInput.length == 0}>
                  Create Tag
                </ToggleButton>
                <ToggleButton
                  // textStyle={tw`text-xs`}
                  onPress={() => {
                    setCurrentSheet('list');
                  }}>
                  Cancel
                </ToggleButton>
              </View>
            </>
          )}
        </View>
      </RNActionSheet>
    </View>
  );
}
