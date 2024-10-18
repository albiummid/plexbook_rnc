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
import DetailsHero from '../../components/content/DetailsHero';

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
      <DetailsHero contentKind="person" details={data} id={id} />
      <View style={tw`px-2`}>
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
      </View>
    </TScrollView>
  );
}
