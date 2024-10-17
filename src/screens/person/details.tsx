import moment from 'moment';
import React from 'react';
import {FlatList, Image, ScrollView, View} from 'react-native';
import Header from '../../components/layout/Header';
import PersonCreditList from '../../components/PersonCreditList';
import Section from '../../components/Section';
import Fallback from '../../components/ui/ScreenFallback';
import TScrollView from '../../components/ui/TScrollView';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import {ScreenProps} from '../../libs/navigation/Screens';
import tw from '../../libs/tailwind';
import {
  getProfileImageURL,
  useContentImages,
  usePersonDetails,
} from '../../libs/tmdb';
import {TPersonImageList} from '../../types/contents/content.types';
import ContentActionBar from '../../components/content/action-bar';
import ContentImageList from '../../components/ContentImageList';

export default function PersonDetailScreen(
  props: ScreenProps<'person_details'>,
) {
  const {id} = props.route.params;
  const {data, ...detailsReq} = usePersonDetails(id);

  const gender =
    data?.gender == 1 ? 'Female' : data?.gender == 2 ? 'Male' : 'Not available';

  if (!data) {
    return (
      <Fallback error={detailsReq.error} isLoading={detailsReq.isLoading} />
    );
  }

  return (
    <TScrollView style={tw`bg-black`}>
      <Header title="Person Details" textStyle={tw`text-white `} />
      <TView style={tw`mx-2 flex-row gap-2`}>
        <TView style={tw`flex-1`}>
          <TText style={tw`text-lg font-bold text-white mb-2`}>
            {data?.name}
          </TText>
          <TText numberOfLines={3} style={tw` text-xs text-white mb-1`}>
            {data?.also_known_as.join(' , ')}
          </TText>
          <TText style={tw` text-sm text-white`}>
            <TText style={tw`font-semibold`}>Profession :</TText>{' '}
            {data?.known_for_department}
          </TText>

          <TText style={tw`text-white`}>
            <TText style={tw`font-bold`}>Gender : </TText> {gender}
          </TText>
          <TText style={tw` text-sm text-white`}>
            <TText style={tw`font-bold`}>Birth : </TText>{' '}
            {moment(data?.birthday).format('DD MMMM YYYY')}
          </TText>
          {data?.deathday ? (
            <TText style={tw` text-sm text-white`}>
              <TText style={tw`font-bold`}>Death : </TText> [`
              {moment(data.deathday).format('DD MMMM YYYY')}`]
            </TText>
          ) : null}

          <TText style={tw`text-white`}>
            <TText style={tw`font-bold`}>Location : </TText>{' '}
            {data?.place_of_birth}
          </TText>
          <ContentActionBar
            contentKind="person"
            data={data}
            id={data.id}
            style={tw`my-2`}
          />
        </TView>
        <View>
          <Image
            style={tw`h-48 w-30 rounded-lg`}
            source={{uri: getProfileImageURL(data?.profile_path!, 'w154')}}
          />
        </View>
      </TView>

      {/* Biography */}
      <Section label="Biography">
        <TText numberOfLines={5} style={tw`text-white `}>
          {data?.biography}
        </TText>
      </Section>

      {/* Images */}
      <ContentImageList id={id} contentKind={'person'} label={data.name} />

      {/* Movie Credits */}
      <PersonCreditList id={id} contentKind="movie" />
      <PersonCreditList id={id} contentKind="tv" />
    </TScrollView>
  );
}
