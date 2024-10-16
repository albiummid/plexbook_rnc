import React, {PropsWithChildren} from 'react';
import tw from '../libs/tailwind';
import {getDuration, getMoneyStr} from '../libs/tmdb';
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
    <Section label="Movie Info" labelColor="white" style={tw``}>
      <InfoCard
        textColor={'white'}
        label="Original Name"
        value={props.data?.original_title}
        isLoading={props.isLoading}
      />

      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Status'}
        value={props.data?.status}
      />

      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Runtime'}
        value={getDuration(props.data?.runtime)}
      />

      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Spoken Language'}
        value={props.data?.spoken_languages
          .map(x => x.english_name ?? x.name)
          .join(', ')}
      />

      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Budget'}
        value={getMoneyStr(props.data?.budget ?? 0)}
      />

      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Revenue'}
        value={getMoneyStr(props.data?.revenue ?? 0)}
      />
      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Tagline'}
        value={props.data?.tagline}
      />
      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Production Companies'}
        value={props.data?.production_companies.map(x => x.name).join(' ,\n')}
      />
      <InfoCard
        textColor={'white'}
        isLoading={props.isLoading}
        label={'Production Countries'}
        value={props.data?.production_countries.map(x => x.name).join(', ')}
      />
    </Section>
  );
}
