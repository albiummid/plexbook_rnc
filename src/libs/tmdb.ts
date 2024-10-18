import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {Image} from 'react-native';
import {
  TMovieListResponse,
  TMultiSearch,
  TPersonDetails,
  TVideoList,
} from '../types/contents/content.types';
import {TMovieListItem} from '../types/contents/movie.types';
import {SeasonDetails, TSeriesListItem} from '../types/contents/series.types';
import {ISO6391LanguageCode, Locale, TMDbTimezone} from '../types/static.types';
const key = process.env.TMDB_API_KEY;
export const tmdbGET = async (path: string) => {
  let url = 'https://api.themoviedb.org/3';
  if (path.includes('?')) {
    url = url + path + `&api_key=${key}`;
  } else {
    url = url + path + `?api_key=${key}`;
  }
  // console.log(url);
  return await axios.get(url);
};

export const getImageURL = (path: string = '') =>
  `https://image.tmdb.org/t/p/original/${path}`;
export const tmdbCustomImage = (path: string, sizeParam: string) =>
  `https://image.tmdb.org/t/p/${sizeParam}/${path}`;

export const getPosterImageURL = (path: string, size: TPosterSizes) => {
  if (!path)
    return Image.resolveAssetSource(require('../assets/images/no-poster.png'))
      .uri;
  return imageProperties.secure_base_url + size + path;
};
export const getBackdropImageURL = (path: string, size: TBackdropSizes) => {
  if (!path)
    return Image.resolveAssetSource(require('../assets/images/no-poster.png'))
      .uri;
  return imageProperties.secure_base_url + size + path;
};
export const getStillImageURL = (path: string, size: TStillSizes) => {
  return imageProperties.secure_base_url + size + path;
};
export const getLogoImageURL = (path: string, size: TLogoSizes) => {
  return imageProperties.secure_base_url + size + path;
};
export const getProfileImageURL = (path: string, size: TProfileSizes) => {
  return imageProperties.secure_base_url + size + path;
};

const imageProperties = {
  base_url: 'http://image.tmdb.org/t/p/',
  secure_base_url: 'https://image.tmdb.org/t/p/',
  backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
  logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
  poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
  profile_sizes: ['w45', 'w185', 'h632', 'original'],
  still_sizes: ['w92', 'w185', 'w300', 'original'],
} as const;

type TBackdropSizes = (typeof imageProperties.backdrop_sizes)[number];
type TLogoSizes = (typeof imageProperties.logo_sizes)[number];
type TPosterSizes = (typeof imageProperties.poster_sizes)[number];
type TProfileSizes = (typeof imageProperties.poster_sizes)[number];
type TStillSizes = (typeof imageProperties.still_sizes)[number];
export const genres: Record<number, string> = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
  10770: 'TV Movie',
};

// Function to get genre names from an array of genre IDs
export const getGenreNames = (genreIds: number[]) => {
  return genreIds.map(id => genres[id] ?? 'Unknown Genre');
};
// imagePath = 440x660 == w x h
// backdropPath = 370x556 == w x h

export const getGenreList = (list: number[]) => {
  let gList: {id: number; name: string}[] = [];
  list?.forEach(x => {
    if (genres[x]) {
      gList.push({
        id: x,
        name: genres[x] ?? '',
      });
    }
  });
  return gList;
};

// export const getImagePath = (path: string) =>
//   `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
// export const getBackdropPath = (path: string) =>
//   `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getContentDetailsById = async (
  contentKind: 'movie' | 'tv' | 'collection' | 'review',
  id: number,
) => {
  return await tmdbGET(`/${contentKind}/${id}`);
};

export const getImagesByContentId = async (
  ContentKind: 'movie' | 'tv',
  id: number,
) => {
  return await tmdbGET(`/${ContentKind}/${id}/images`);
};
export const getVideosByContentId = async (
  ContentKind: 'movie' | 'tv',
  id: number,
) => {
  return await tmdbGET(`/${ContentKind}/${id}/videos`);
};

export const getTopRatedContents = async (
  contentId: 'movie' | 'tv',
  pageParams: number = 1,
) => {
  return await tmdbGET(`/${contentId}/top_rated?page=${pageParams}`);
};
export const getTrending = async (
  contentId: 'movie' | 'tv' | 'person',
  timeWindow: 'month' | 'week' = 'week',
) => {
  return await tmdbGET(`/trending/${contentId}/${timeWindow}`);
};
export const getUpcomingContents = async (contentId: 'movie' | 'tv') => {
  return await tmdbGET(`/${contentId}/upcoming`);
};
export const getPopularContents = async (
  contentId: 'movie' | 'tv',
  pageParams: string | any = 1,
) => {
  return await tmdbGET(`/${contentId}/popular?page=${pageParams}`);
};
// export const getLatestContents = async (contentId: 'movie' | 'tv') => {
//   return await tmdbGET(`/${contentId}/latest`);
// };
// export const getNowPlayingTVS = async () => {
//     const data = await tmdbGET(`/${"tv"}/on_the_air`);
//     return data.results;
// };

// export const getMovieDetailsById = async (id: number | string) => {
//     const data = await tmdbGET("/movie/" + id);
//     return data;
// };

export const useContentVideos = (id: number, contentKind: 'movie' | 'tv') => {
  return useQuery({
    queryKey: [`${contentKind}-videos`, id],
    queryFn: () => tmdbGET(`/${contentKind}/${id}/videos`),
    select(res) {
      return res.data as TVideoList;
    },
  });
};

// export const useContentImages = (id: number, contentKind: 'movie' | 'tv') => {
//   return useQuery({
//     queryKey: [`${contentKind}-images`, id, contentKind],
//     queryFn: () => tmdbGET(`/${contentKind}/${id}/images`),
//     select(res) {
//       return res.data as TImageList;
//     },
//   });
// };

// export const getMovieTrailersById = async (id: number) => {
//     const data = await tmdbGET(`/movie/${id}/videos`);
//     return data.results;
// };
// export const getContentTrailersById = async (
//     contentId: "movie" | "tv",
//     id: number
// ) => {
//     const data = await tmdbGET(`/${contentId}/${id}/videos`);
//     return data.results;
// };

// export const getMovieCastListById = async (id: number) => {
//     const data = await tmdbGET(`/movie/${id}/credits`);
//     return data.cast;
// };
export const getContentCastListById = async (
  contentId: 'movie' | 'tv',
  id: number,
) => {
  return await tmdbGET(`/${contentId}/${id}/credits`);
};
export const usePersonContentCredit = (
  contentKind: 'movie' | 'tv',
  personId: number,
) => {
  return useQuery({
    queryKey: [`person-credits`, personId, contentKind],
    queryFn: () => tmdbGET(`/person/${personId}/${contentKind}_credits`),
    select(data) {
      return data.data;
    },
  });
};

// export const getSimilarMovieListById = async (id: number) => {
//     const data = await tmdbGET(`/movie/${id}/similar`);
//     return serializeData(data.results);
// };
export const getSimilarContentListById = async (
  contentKind: 'movie' | 'tv',
  id: number,
) => {
  return await tmdbGET(`/${contentKind}/${id}/similar`);
};

export const useContentRecommendationList = (
  contentKind: 'movie' | 'tv',
  id: number,
) => {
  return useInfiniteQuery({
    queryKey: ['recommendation-list', contentKind, id],
    queryFn: () => tmdbGET(`/${contentKind}/${id}/recommendations`),
    initialPageParam: 1,
    getNextPageParam: ({data}: {data: TMovieListResponse<TMovieListItem>}) => {
      if (data.page < data.total_pages) {
        return data.page + 1;
      }
    },
  });
};
export const useContentRecommendation = (
  contentKind: 'movie' | 'tv',
  id: number,
) => {
  return useQuery({
    queryKey: ['recommendation-list', contentKind, id],
    queryFn: () => tmdbGET(`/${contentKind}/${id}/recommendations`),
    select(data) {
      return data.data;
    },
  });
};
export const useSeriesSeason = (id: number, season_number: number) => {
  return useQuery({
    queryKey: ['recommendation-list', id],
    queryFn: () => tmdbGET(`/tv/${id}/season/${season_number}`),
    select(data) {
      return data.data as SeasonDetails;
    },
  });
};
export const useSeriesSeasonsEpisode = (
  id: number,
  season_number: number,
  episode_number: number,
) => {
  return useQuery({
    queryKey: ['recommendation-list', id],
    queryFn: () =>
      tmdbGET(`/tv/${id}/season/${season_number}/episode/${episode_number}`),
    select(data) {
      return data.data;
    },
  });
};
export const getContentRecommendationListById = async (
  contentKind: 'movie' | 'tv',
  id: number,
) => {
  return await tmdbGET(`/${contentKind}/${id}/recommendations`);
};
// export const searchContentByQueryKeywords = async (
//     category: "multi" | "movie" | "tv" | "person" | "collection",
//     query: string,
//     page: number = 1
// ) => {
//     const data = await tmdbGET(
//         `/search/${category}?query=${query}&page=${page}`
//     );
//     return {
//         list: serializeData(data.results).sort(
//             (a, b) => Number(b.popularity) - Number(a.popularity)
//         ),
//         page: data.page,
//         total_pages: data.total_pages,
//         total_results: data.total_results,
//     };
// };

export const getContentCollection = async (collectionId: number) => {
  return await tmdbGET(`/collection/${collectionId}`);
};

export const getDuration = (runtimeInMinutes: number = 0) => {
  const totalInSecond = runtimeInMinutes * 60;

  const hours = Math.floor(totalInSecond / 3600);
  const minutes = Math.floor((totalInSecond % 3600) / 60);
  const seconds = totalInSecond % 60;
  let string = '';
  if (hours > 0) {
    string += hours + 'h ';
  }
  if (minutes > 0) {
    string += minutes + 'm ';
  }
  if (seconds > 10) {
    string += seconds + 's';
  }
  return string;
};

export const getMoneyStr = (num: number) => {
  return `$ ${num} `;
};

export const getGenreNameById = (id: number) => genres[id];

export const useDiscoverSeries = (
  {
    sort_by = 'popularity',
    sort_order = 'desc',
    language = 'en-US',
    page = 1,
    ...params
  }: {
    sort_by?: keyof TSeriesListItem;
    sort_order?: 'asc' | 'desc';
    air_date_gte?: string;
    air_date_lte?: string;
    first_air_date_gte?: string;
    first_air_date_lte?: string;
    first_air_date_year?: number;
    language?: Locale;
    timezone?: TMDbTimezone;
    page?: number;
    with_genres?: number;
    without_genres?: string;
    with_runtime_gte?: number;
    with_runtime_lte?: number;
    with_watch_region?: string;
    with_original_language?: ISO6391LanguageCode;
    with_watch_providers?: string;
    with_keywords?: string;
    without_keywords?: string;
    with_companies?: string;
    watch_region?: string;
  },
  enabled?: boolean,
) => {
  let queryStrArr = [`sort_by=${sort_by}.${sort_order}`];

  if (params.air_date_gte) {
    queryStrArr.push(`air_date.gte=${params.air_date_gte}`);
  }
  if (params.air_date_lte) {
    queryStrArr.push(`air_date.lte=${params.air_date_lte}`);
  }
  if (params.first_air_date_gte) {
    queryStrArr.push(`first_air_date.gte=${params.first_air_date_gte}`);
  }
  if (params.first_air_date_lte) {
    queryStrArr.push(`first_air_date.lte=${params.first_air_date_lte}`);
  }
  if (params.first_air_date_year) {
    queryStrArr.push(`first_air_date_year=${params.first_air_date_year}`);
  }
  if (language) {
    queryStrArr.push(`language=${language}`);
  }
  if (page) {
    queryStrArr.push(`page=${page}`);
  }
  if (params.timezone) {
    queryStrArr.push(`timezone=${params.timezone}`);
  }
  if (params.with_genres) {
    queryStrArr.push(`with_genres=${params.with_genres}`);
  }
  if (params.without_genres) {
    queryStrArr.push(`without_genres=${params.without_genres}`);
  }

  if (params.with_runtime_gte) {
    queryStrArr.push(`with_runtime.gte=${params.with_runtime_gte}`);
  }
  if (params.with_runtime_lte) {
    queryStrArr.push(`with_runtime.lte=${params.with_runtime_lte}`);
  }

  if (params.with_original_language) {
    queryStrArr.push(`with_original_language=${params.with_original_language}`);
  }
  return useQuery({
    queryKey: ['discover-tv', page, {params, sort_by, sort_order, language}],
    queryFn: () => tmdbGET(`/discover/tv?` + queryStrArr.join('&')),
    select(data) {
      return data.data;
    },
    enabled,
  });
};
export const useDiscoverMovie = (
  {
    sort_by = 'popularity',
    sort_order = 'desc',
    language = 'en-US',
    page = 1,
    ...params
  }: {
    sort_by?: keyof TMovieListItem;
    sort_order?: 'asc' | 'desc';
    release_date_gte?: string;
    release_date_lte?: string;
    primary_release_date_gte?: string;
    primary_release_date_lte?: string;
    primary_release_date_year?: number;
    language?: Locale;
    timezone?: TMDbTimezone;
    page?: number;
    with_genres?: number;
    without_genres?: string;
    with_runtime_gte?: number;
    with_runtime_lte?: number;
    with_watch_region?: string;
    with_original_language?: ISO6391LanguageCode;
    with_watch_providers?: string;
    with_keywords?: string;
    without_keywords?: string;
    with_companies?: string;
    with_cast?: string;
    with_crew?: string;
    with_people?: string;
    watch_region?: string;
  },
  enabled?: boolean,
) => {
  let queryStrArr = [`sort_by=${sort_by}.${sort_order}`];

  if (params.release_date_gte) {
    queryStrArr.push(`release_date.gte=${params.release_date_gte}`);
  }
  if (params.release_date_lte) {
    queryStrArr.push(`release_date.lte=${params.release_date_lte}`);
  }
  if (params.primary_release_date_gte) {
    queryStrArr.push(
      `primary_release_date.gte=${params.primary_release_date_gte}`,
    );
  }
  if (params.primary_release_date_lte) {
    queryStrArr.push(
      `primary_release_date.lte=${params.primary_release_date_lte}`,
    );
  }
  if (params.primary_release_date_year) {
    queryStrArr.push(
      `primary_release_date_year=${params.primary_release_date_year}`,
    );
  }
  if (language) {
    queryStrArr.push(`language=${language}`);
  }
  if (page) {
    queryStrArr.push(`page=${page}`);
  }
  if (params.timezone) {
    queryStrArr.push(`timezone=${params.timezone}`);
  }
  if (params.with_genres) {
    queryStrArr.push(`with_genres=${params.with_genres}`);
  }
  if (params.without_genres) {
    queryStrArr.push(`without_genres=${params.without_genres}`);
  }

  if (params.with_runtime_gte) {
    queryStrArr.push(`with_runtime.gte=${params.with_runtime_gte}`);
  }
  if (params.with_runtime_lte) {
    queryStrArr.push(`with_runtime.lte=${params.with_runtime_lte}`);
  }

  if (params.with_original_language) {
    queryStrArr.push(`with_original_language=${params.with_original_language}`);
  }

  if (params.with_cast) {
    queryStrArr.push(`with_cast=${params.with_cast}`);
  }

  if (params.with_crew) {
    queryStrArr.push(`with_crew=${params.with_crew}`);
  }
  if (params.with_people) {
    queryStrArr.push(`with_people=${params.with_people}`);
  }
  return useQuery({
    queryKey: ['discover-movie', {params, page, sort_by, language}],
    queryFn: () => tmdbGET(`/discover/movie?` + queryStrArr.join('&')),
    select(data) {
      return data.data;
    },
    enabled,
  });
};

export const useMultiSearch = (query: string, page: number = 1) =>
  useQuery({
    queryKey: ['multi-search', query, page],
    queryFn: () => tmdbGET(`/search/multi?query=${query}&page=${page}`),
    select(data) {
      return data.data as TMultiSearch;
    },
    // enabled: query.length > 0,
  });
export const usePersonDetails = (id: number) =>
  useQuery({
    queryKey: ['person-details', id],
    queryFn: () => tmdbGET(`/person/${id}`),
    select(data) {
      return data.data as TPersonDetails;
    },
    // enabled: query.length > 0,
  });

const TMDBConfigs = {
  images: {
    base_url: 'http://image.tmdb.org/t/p/',
    secure_base_url: 'https://image.tmdb.org/t/p/',
    backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
    logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
    poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    profile_sizes: ['w45', 'w185', 'h632', 'original'],
    still_sizes: ['w92', 'w185', 'w300', 'original'],
  },
  change_keys: [
    'adult',
    'air_date',
    'also_known_as',
    'alternative_titles',
    'biography',
    'birthday',
    'budget',
    'cast',
    'certifications',
    'character_names',
    'created_by',
    'crew',
    'deathday',
    'episode',
    'episode_number',
    'episode_run_time',
    'freebase_id',
    'freebase_mid',
    'general',
    'genres',
    'guest_stars',
    'homepage',
    'images',
    'imdb_id',
    'languages',
    'name',
    'network',
    'origin_country',
    'original_name',
    'original_title',
    'overview',
    'parts',
    'place_of_birth',
    'plot_keywords',
    'production_code',
    'production_companies',
    'production_countries',
    'releases',
    'revenue',
    'runtime',
    'season',
    'season_number',
    'season_regular',
    'spoken_languages',
    'status',
    'tagline',
    'title',
    'translations',
    'tvdb_id',
    'tvrage_id',
    'type',
    'video',
    'videos',
  ],
} as const;

export const getIMDBRating = async (imdbId: string) => {
  const data = await axios.get(
    `${process.env.IMDB_SERVER_URL}/title/${imdbId}`,
  );
  return {
    count: data.data.rating.count,
    star: data.data.rating.star,
  };
};

export const useContentImages = (
  {
    id,
    contentKind,
    personTaggedImages,
  }: {
    id: number;
    contentKind: 'movie' | 'tv' | 'person';
    personTaggedImages?: boolean;
  },
  enabled = true,
) => {
  return useQuery({
    queryKey: [`images`, {id, personTaggedImages, contentKind}],
    enabled: Boolean(enabled),
    queryFn: () =>
      tmdbGET(
        `/${contentKind}/${id}/${
          personTaggedImages ? 'tagged_images' : 'images'
        }`,
      ),
    select(res) {
      return res.data;
    },
  });
};

export const useContentSearch = (props: {
  contentKind: 'movie' | 'tv' | 'person' | 'collection';
  query: string;
}) => {
  return useTMDBInfiniteList(`/search/${props.contentKind}`, {
    query: props.query,
  });
};

export const useTMDBInfiniteList = (
  pathURL: string,
  query: Record<string, any>,
) => {
  let queryHook = useInfiniteQuery({
    queryKey: [pathURL, {query}],
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) =>
      lastPage.page < lastPage.total_pages
        ? Number(lastPage.page) + 1
        : undefined,
    queryFn: async ({pageParam}) => {
      const queries = Object.entries({...query, page: pageParam})
        .filter(([key, value]) => Boolean(value))
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      const {data} = await tmdbGET(`${pathURL}?${queries}`);
      return {
        ...data,
        results: data.results
          .filter((x: any) => {
            return x.popularity < 0.5 && x.poster_path == null ? false : true;
          }) // filtering broken results
          .sort((a: any, b: any) => b.popularity - a.popularity), // sorting to get popular result first,
      };
    },
  });
  return {
    ...queryHook,
    flattenedData: queryHook?.data?.pages.flatMap(x => x.results),
  };
};
