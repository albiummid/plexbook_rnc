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
    <TouchableOpacity disabled={!isLoading} onPress={onPress}>
      <Icon
        name={iconName}
        size={25}
        style={tw.style(
          ` mr-auto p-2 rounded-full`,
          isEnabled ? 'bg-primary text-white' : 'text-primary bg-white',
          !isLoading && ' opacity-80',
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

  const [{data: userContent, ...userContentReq}, {data: tagList}] = useQueries({
    queries: [
      {
        queryKey: ['user-content', {userId, contentKind, id}],
        queryFn: async () => {
          const {data} = await api.get(
            `/content/list?userId=${userId}&tmdbId=${id}`,
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
    await api.post('/content/tag/assign', {
      userId,
      cType: contentKind,
      tagLabel,
      tmdbId: id,
    });
  };
  const removeTag = async (tagLabel: string) => {
    await api.post('/content/tag/remove', {
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
      if (currentState == true) {
        await removeTag(tagLabel);
      } else {
        await assignTag(tagLabel);
      }
      userContentReq.refetch();
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
      await api.post(`/content/tag/create`, {
        userId,
        label: tagInput,
      });
      queryClient.invalidateQueries({queryKey: ['tag-list']});
    } catch (err) {
      setError('Something went wrong !');
    }
  };

  return (
    <View style={[tw.style(`flex-row gap-2`), style]}>
      <ActionButton
        isLoading={loading}
        isEnabled={isFavorite}
        onPress={() => {
          handleToggle('Favorite', isFavorite);
        }}
        Icon={Icons.Feather}
        iconName="heart"
      />
      <ActionButton
        isLoading={loading}
        isEnabled={isFavorite}
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
        isEnabled={isWatchLater}
        onPress={() => {
          sheetRef.current?.show();
        }}
        Icon={Icons.Feather}
        iconName={'folder-plus'}
      />

      <ActionSheet
        onClose={() => {
          setError('');
          setTagInput('');
          setCurrentSheet('list');
        }}
        containerStyle={tw`p-4 min-h-60`}
        ref={sheetRef}>
        <TView
          // stack="hStack"
          // alignItems="center"
          gap={2}
          style={tw`border-b  pb-1 border-gray-200`}
          justifyContent="between">
          <TText style={tw`text-base font-bold `}>
            {currentSheet === 'list' ? 'Add to tag list' : 'Create tag'}
          </TText>
          <TView stack="hStack" justifyContent="between">
            <TButton
              onPress={() => {
                setCurrentSheet(pv => (pv == 'list' ? 'create-tag' : 'list'));
              }}>
              {currentSheet !== 'list' ? 'Add to tag list' : 'Create tag'}
            </TButton>
            <TButton
              onPress={() => {
                sheetRef.current?.hide();
              }}>
              Close
            </TButton>
          </TView>
        </TView>
        <View>
          {currentSheet === 'list' && (
            <ScrollView style={tw`mt-2`}>
              {tagList?.map((x: any) => {
                const isAssigned = userContent?.tags?.includes(x.value);
                return (
                  <TouchableOpacity
                    onPress={v => {
                      handleToggle(x.label, isAssigned);
                    }}
                    key={x._id}
                    style={tw`p-1 flex-row gap-1 border justify-between mb-2 rounded-lg border-gray-300`}>
                    <TText style={tw`font-bold ml-2`}>{x.label}</TText>
                    <RNBouncyCheckbox
                      onPress={v => {
                        handleToggle(x.label, isAssigned);
                      }}
                      size={20}
                      useBuiltInState={false}
                      fillColor={colors.primary}
                      isChecked={isAssigned}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>

        <>
          {currentSheet === 'create-tag' && (
            <>
              <View style={tw`my-4`}>
                <TText>Tag Name</TText>
                <TextInput
                  style={tw.style(
                    `px-2 py-1 rounded-lg border my-1 `,
                    error.length > 0 && 'border-red-400',
                  )}
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
              <TButton
                onPress={handleCreateTag}
                disabled={tagInput.length == 0}
                textStyle={tw`w-full py-2`}>
                Create Tag
              </TButton>
            </>
          )}
        </>
      </ActionSheet>
    </View>
  );
}
