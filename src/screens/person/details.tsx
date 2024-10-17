import moment from 'moment';
import React from 'react';
import {FlatList, Image} from 'react-native';
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

export default function PersonDetailScreen(
  props: ScreenProps<'person_details'>,
) {
  const {id} = props.route.params;
  const {data, ...detailsReq} = usePersonDetails(id);
  const {data: imageRes, ...req}: {data: TPersonImageList | undefined} =
    useContentImages(id, 'person');

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
        <Image
          style={tw`h-48 w-30 rounded-lg`}
          source={{uri: getProfileImageURL(data?.profile_path!, 'w154')}}
        />
        <TView style={tw`flex-1`}>
          <TText style={tw`text-lg font-bold text-white`}>{data?.name}</TText>
          <TText numberOfLines={3} style={tw` text-xs text-white`}>
            <TText style={tw`font-bold text-sm`}>Also Known as :</TText>{' '}
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
        </TView>
      </TView>

      {/* Biography */}
      <Section label="Biography">
        <TText style={tw`text-white mx-2`}>{data?.biography}</TText>
      </Section>
      {/* Known for */}
      <Section label="Known for"></Section>
      {/* Images */}
      <Section label="Profile Images">
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          bounces
          data={imageRes?.profiles}
          renderItem={({item}) => {
            return (
              <Image
                style={tw`h-30 w-20 ml-2 rounded-lg `}
                source={{uri: getProfileImageURL(item.file_path, 'w154')}}
              />
            );
          }}
        />
      </Section>

      {/* Movie Credits */}
      <PersonCreditList id={id} contentKind="movie" />
      <PersonCreditList id={id} contentKind="tv" />
    </TScrollView>
  );
}
