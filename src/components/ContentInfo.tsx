import React, {PropsWithChildren} from 'react';
import tw from '../lib/tailwind';
import {getDuration, getMoneyStr} from '../lib/tmdb';
import {TMovieDetails} from '../types/contents/movie.types';
import InfoCard from './content/card/info-card';
import Section from './Section';
import TDivider from './ui/TDivider';

export function MovieInfo(
  props: PropsWithChildren<{
    data?: TMovieDetails;
    isLoading: boolean;
  }>,
) {
  return (
    <Section label="Movie Info" labelColor="white" style={tw`px-2 `}>
      <InfoCard
        textColor={'white'}
        label="Original Name"
        value={props.data?.original_title}
        isLoading={props.isLoading}
      />
      <TDivider vertical gap={5} />
      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Status'}
        value={props.data?.status}
      />
      <TDivider vertical gap={5} />

      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Runtime'}
        value={getDuration(props.data?.runtime)}
      />
      <TDivider vertical gap={5} />

      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Spoken Language'}
        value={props.data?.spoken_languages.map(x => x.english_name).join(', ')}
      />
      <TDivider vertical gap={5} />

      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Budget'}
        value={getMoneyStr(props.data?.budget ?? 0)}
      />
      <TDivider vertical gap={5} />

      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Revenue'}
        value={getMoneyStr(props.data?.revenue ?? 0)}
      />
      <TDivider vertical gap={5} />
      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Tagline'}
        value={props.data?.tagline}
      />
      <TDivider vertical gap={5} />
      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Production Companies'}
        value={props.data?.production_companies.map(x => x.name).join(' ,\n')}
      />
      <TDivider vertical gap={5} />
      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Production Countries'}
        value={props.data?.production_countries.map(x => x.name).join(', ')}
      />
      <TDivider vertical gap={5} />
    </Section>
  );
}
