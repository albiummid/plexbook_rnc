import React from 'react';
import {FlatList} from 'react-native';
import {TSeriesDetails} from '../../../types/contents/series.types';
import Section from '../../Section';
import {renderHorizontalSkeltonList} from '../card/content-skelton';
import {SeasonCard} from '../card/series-card';

export default function SeasonSection(props: {data?: TSeriesDetails}) {
  return (
    <Section label={`Seasons`} labelColor="white">
      {!props.data && renderHorizontalSkeltonList()}
      {props?.data && (
        <>
          <FlatList
            horizontal
            data={props.data.seasons}
            renderItem={({item}) => (
              <SeasonCard {...item} seriesId={props.data!.id} />
            )}
          />
        </>
      )}
    </Section>
  );
}
