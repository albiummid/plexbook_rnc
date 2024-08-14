import axios from 'axios';

export const tmdbGET = async (path: string) => {
  const key = process.env.TMDB_API_KEY;
  let url = 'https://api.themoviedb.org/3';
  if (path.includes('?')) {
    url = url + path + `&api_key=${key}`;
  } else {
    url = url + path + `?api_key=${key}`;
  }
  return (await axios.get(url)).data;
};

export const tmdbOriginalImage = (path: string = '') =>
  `https://image.tmdb.org/t/p/original/${path}`;
export const tmdbCustomImage = (path: string, sizeParam: string) =>
  `https://image.tmdb.org/t/p/${sizeParam}/${path}`;

const genres: any = {
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
  10770: 'TV Movie',
};
// imagePath = 440x660 == w x h
// backdropPath = 370x556 == w x h

export const getImagePath = (path: string) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
export const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

const serializeData = (contentList: any[]) => {
  if (contentList.length > 0) {
    return contentList?.map(({genre_ids, ...rest}: any) => ({
      ...rest,
      genres: genre_ids?.map((genre: any) => genres[genre]) || [],
    }));
  }
  return [];
};

export const getDetailsById = async (
  contentId: 'movie' | 'tv' | 'collection' | 'review',
  id: number,
) => {
  return await tmdbGET(`/${contentId}/${id}`);
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

// export const getMovies = async () => {
//     const data = await tmdbGET("/discover/movie");
//     return serializeData(data.results);
// };
// export const getLatestMovies = async () => {
//     const data = await tmdbGET("/movie/now_playing");
//     return serializeData(data.results);
// };

// export const getPopularMovies = async () => {
//     const data = await tmdbGET("/movie/popular");
//     return serializeData(data.results);
// };

// export const getUpcomingMovies = async () => {
//     const data = await tmdbGET("/movie/upcoming");
//     return serializeData(data.results);
// };
// export const getTopRatedMovies = async () => {
//     const data = await tmdbGET("/movie/top_rated");
//     return serializeData(data.results);
// };
export const getTopRatedContents = async (contentId: 'movie' | 'tv') => {
  return await tmdbGET(`/${contentId}/top_rated`);
};
export const getTrending = async (
  contentId: 'movie' | 'tv' | 'person',
  timeWindow: 'month' | 'week' = 'week',
) => {
  return await tmdbGET(`/trending/${contentId}/${timeWindow}`);

  // return data.results.sort(
  //     (a, b) => Number(b.popularity) - Number(a.popularity)
  // );
};
export const getUpcomingContents = async (contentId: 'movie' | 'tv') => {
  return await tmdbGET(`/${contentId}/upcoming`);
};
export const getPopularContents = async (contentId: 'movie' | 'tv') => {
  return await tmdbGET(`/${contentId}/popular`);
};
export const getLatestContents = async (contentId: 'movie' | 'tv') => {
  return await tmdbGET(`/${contentId}/latest`);
};
// export const getNowPlayingTVS = async () => {
//     const data = await tmdbGET(`/${"tv"}/on_the_air`);
//     return data.results;
// };

// export const getMovieDetailsById = async (id: number | string) => {
//     const data = await tmdbGET("/movie/" + id);
//     return data;
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
// export const getContentCastListById = async (
//     contentId: "movie" | "tv",
//     id: number
// ) => {
//     const data = await tmdbGET(`/${contentId}/${id}/credits`);
//     return data.cast;
// };

// export const getSimilarMovieListById = async (id: number) => {
//     const data = await tmdbGET(`/movie/${id}/similar`);
//     return serializeData(data.results);
// };
// export const getSimilarContentListById = async (
//     contentId: "movie" | "tv",
//     id: number
// ) => {
//     const data = await tmdbGET(`/${contentId}/${id}/similar`);
//     return serializeData(data.results);
// };
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

// export const getContentCollection = async (collectionId: number) => {
//     const data = await tmdbGET(`/collection/${collectionId}`);
//     return data;
// };

export const getDuration = (runtimeInMinutes: number = 0) => {
  const totalInSecond = runtimeInMinutes * 60;

  const hours = Math.floor(totalInSecond / 3600);
  const minutes = Math.floor((totalInSecond % 3600) / 60);
  const seconds = totalInSecond % 60;
  let string = '';
  if (hours > 0) {
    console.log('GD))0');
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