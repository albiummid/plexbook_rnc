export interface TMovieListResponse<T> {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
}

export interface TImageList {
  id: number;
  backdrops: Backdrop[];
  posters: Poster[];
}

export interface Poster {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Backdrop {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface TVideoList {
  id: number;
  results: Result[];
}

interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface ContentVideoResponseT {
  id: number;
  results: ContentVideoResponseItemT[];
}

export interface ContentVideoResponseItemT {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: 'Behind the Scenes' | 'Trailer';
  official: boolean;
  published_at: string;
  id: string;
}

export interface TMultiSearch {
  page: number;
  results: TMultiSearchItem[];
  total_pages: number;
  total_results: number;
}

export interface TMultiSearchItem {
  adult: boolean;
  backdrop_path: null | string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: 'movie' | 'tv' | 'person';
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}
