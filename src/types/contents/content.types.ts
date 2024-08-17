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
