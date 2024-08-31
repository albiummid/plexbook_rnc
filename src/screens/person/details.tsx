import moment from 'moment';
import React from 'react';
import {FlatList, Image} from 'react-native';
import Header from '../../components/layout/Header';
import PersonCreditList from '../../components/PersonCreditList';
import Section from '../../components/Section';
import TScrollView from '../../components/ui/TScrollView';
import TText from '../../components/ui/TText';
import TView from '../../components/ui/TView';
import tw from '../../libs/tailwind';
import {getImageURL, useContentImages, usePersonDetails} from '../../libs/tmdb';
import {ScreenProps} from '../../navigation/Screens';
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

  return (
    <TScrollView>
      <Header title="Person Details" />
      <TView style={tw`mx-2 flex-row gap-2`}>
        <Image
          style={tw`h-48 w-30 rounded-lg`}
          source={{uri: getImageURL(data?.profile_path)}}
        />
        <TView style={tw`flex-1`}>
          <TText style={tw`text-lg font-bold text-black`}>{data?.name}</TText>
          <TText numberOfLines={3} style={tw` text-xs text-black`}>
            <TText style={tw`font-bold text-sm`}>Also Known as :</TText>{' '}
            {data?.also_known_as.join(' , ')}
          </TText>
          <TText style={tw` text-sm text-black`}>
            <TText style={tw`font-semibold`}>Profession :</TText>{' '}
            {data?.known_for_department}
          </TText>

          <TText style={tw`text-black`}>
            <TText style={tw`font-bold`}>Gender : </TText> {gender}
          </TText>
          <TText style={tw` text-sm text-black`}>
            <TText style={tw`font-bold`}>Birth : </TText>{' '}
            {moment(data?.birthday).format('DD MMMM YYYY')}
          </TText>
          {data?.deathday ? (
            <TText style={tw` text-sm text-black`}>
              <TText style={tw`font-bold`}>Death : </TText> [`-$
              {moment(data.deathday).format('DD MMMM YYYY')}`]
            </TText>
          ) : null}

          <TText style={tw`text-black`}>
            <TText style={tw`font-bold`}>Location : </TText>{' '}
            {data?.place_of_birth}
          </TText>
        </TView>
      </TView>

      {/* Biography */}
      <Section label="Biography" style={tw`h-30  mx-2`}>
        <TScrollView>
          <TText>{data?.biography}</TText>
        </TScrollView>
      </Section>
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
                style={tw`h-40 w-26 ml-2 rounded-lg `}
                source={{uri: getImageURL(item.file_path)}}
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
