import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
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
import SeriesCard from './content/card/series-card';

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
              <FlatList
                horizontal
                data={
                  contentCredit?.cast?.sort(
                    (a: any, b: any) => b.vote_average - a.vote_average,
                  ) as TMovieCastCredit[]
                }
                keyExtractor={(i, idx) => String(idx) + i}
                renderItem={({item}) => (
                  <TouchableOpacity style={tw`w-24 mr-2`}>
                    {contentKind === 'movie' ? (
                      <MovieCard
                        contentId={item.id}
                        style={tw` w-24`}
                        data={item as any}
                      />
                    ) : (
                      <SeriesCard
                        contentId={item.id}
                        style={tw` w-24`}
                        data={item as any}
                      />
                    )}
                    <TText
                      numberOfLines={1}
                      style={tw`text-xs text-center text-white  mt-1`}>
                      {item?.character}
                    </TText>
                    <TText
                      numberOfLines={1}
                      style={tw` font-bold text-center text-white `}>
                      {contentKind === 'movie' ? item.title : item.name}
                    </TText>
                  </TouchableOpacity>
                )}
              />
            </>
          )}
        </TView>
      )}
    </Section>
  );
}
