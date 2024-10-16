import React from 'react';
import {FlatList} from 'react-native';
import tw from '../libs/tailwind';
import {usePersonContentCredit} from '../libs/tmdb';
import {uniqueArray} from '../libs/utils/helpers';
import {TMovieListItem} from '../types/contents/movie.types';
import {TMovieCastCredit} from '../types/contents/person.types';
import {renderHorizontalSkeltonList} from './content/card/content-skelton';
import MovieCard from './content/card/movie-card';
import Section from './Section';
import Skelton from './ui/Skelton';
import TText from './ui/TText';
import TView from './ui/TView';

const CreditSectionSkelton = () => {
  return (
    <TView style={tw`my-4`}>
      <Skelton style={tw`w-20 h-5 ml-2 rounded-lg mb-4`} />
      {renderHorizontalSkeltonList()}
    </TView>
  );
};

export default function PersonCreditList({
  id,
  contentKind,
}: {
  id: number;
  contentKind: 'movie' | 'tv';
}) {
  const {data: contentCredit, ...req} = usePersonContentCredit(contentKind, id);
  if (req.isSuccess && contentCredit?.cast?.length == 0) {
    return null;
  }
  return (
    <Section
      label={(contentKind === 'movie' ? 'Movie' : 'Series') + ' credits'}>
      {req.isLoading ? (
        <CreditSectionSkelton />
      ) : (
        <TView>
          {contentCredit?.cast.length > 0 && (
            <>
              <TText
                style={tw`text-base text-white ml-2 mb-4 font-bold mr-auto border-b-4 border-primary `}>
                As a cast
              </TText>
              <FlatList
                horizontal
                data={uniqueArray(contentCredit?.cast) as TMovieCastCredit[]}
                keyExtractor={(i, idx) => String(idx) + i}
                renderItem={({item}) => (
                  <MovieCard
                    contentId={item.id}
                    style={tw`ml-2`}
                    data={item as TMovieListItem}
                  />
                )}
              />
            </>
          )}
        </TView>
      )}
    </Section>
  );
}
