import React, {PropsWithChildren} from 'react';
import tw from '../lib/tailwind';
import {getDuration, getMoneyStr} from '../lib/tmdb';
import {TMovieDetails} from '../types/contents/movie.types';
import InfoCard from './content/card/info-card';
import Section from './Section';
import Skelton from './ui/Skelton';
import TDivider from './ui/TDivider';

const InfoSkelton = () => {
  return <Skelton />;
};

export function MovieInfo(
  props: PropsWithChildren<{
    data?: TMovieDetails;
  }>,
) {
  if (!props.data) {
    return <InfoSkelton />;
  }
  return (
    <Section label="Movie Info" labelColor="white" style={tw`px-2 `}>
      <InfoCard
        textColor={'white'}
        label="Original Name"
        value={props.data.original_title}
      />
      <TDivider vertical gap={5} />
      <InfoCard
        textColor={'white'}
        label={'Status'}
        value={props.data.status}
      />
      <TDivider vertical gap={5} />

      <InfoCard
        textColor={'white'}
        label={'Runtime'}
        value={getDuration(props.data.runtime)}
      />
      <TDivider vertical gap={5} />

      <InfoCard
        textColor={'white'}
        label={'Spoken Language'}
        value={props.data.spoken_languages.map(x => x.english_name).join(', ')}
      />
      <TDivider vertical gap={5} />

      <InfoCard
        textColor={'white'}
        label={'Budget'}
        value={getMoneyStr(props.data.budget)}
      />
      <TDivider vertical gap={5} />

      <InfoCard
        textColor={'white'}
        label={'Revenue'}
        value={getMoneyStr(props.data.revenue)}
      />
      <TDivider vertical gap={5} />
      <InfoCard
        textColor={'white'}
        label={'Tagline'}
        value={props.data.tagline}
      />
      <TDivider vertical gap={5} />
      <InfoCard
        textColor={'white'}
        label={'Production Companies'}
        value={props.data.production_companies.map(x => x.name).join(' ,\n')}
      />
      <TDivider vertical gap={5} />
      <InfoCard
        textColor={'white'}
        label={'Production Countries'}
        value={props.data.production_countries.map(x => x.name).join(', ')}
      />
      <TDivider vertical gap={5} />
    </Section>
  );
}
