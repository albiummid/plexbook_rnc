export interface TPersonTVCredit {
  cast: TSeriesCastCredit[];
  crew: TSeriesCrewCredit[];
  id: number;
}

export interface TSeriesCrewCredit {
  id: number;
  department: string;
  original_language: string;
  episode_count: number;
  job: string;
  overview: string;
  origin_country: string[];
  original_name: string;
  genre_ids: number[];
  name: string;
  first_air_date: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  poster_path: string;
  credit_id: string;
}

export interface TSeriesCastCredit {
  credit_id: string;
  original_name: string;
  id: number;
  genre_ids: number[];
  character: string;
  name: string;
  poster_path: null | string;
  vote_count: number;
  vote_average: number;
  popularity: number;
  episode_count: number;
  original_language: string;
  first_air_date: string;
  backdrop_path: null | string;
  overview: string;
  origin_country: string[];
}

export interface TPersonMovieCredit {
  cast: TMovieCastCredit[];
  crew: TMovieCrewCredit[];
  id: number;
}

export interface TMovieCrewCredit {
  id: number;
  department: string;
  original_language: string;
  original_title: string;
  job: string;
  overview: string;
  vote_count: number;
  video: boolean;
  poster_path: null | string;
  backdrop_path: null | string;
  title: string;
  popularity: number;
  genre_ids: number[];
  vote_average: number;
  adult: boolean;
  release_date: string;
  credit_id: string;
}

export interface TMovieCastCredit {
  character: string;
  credit_id: string;
  release_date: string;
  vote_count: number;
  video: boolean;
  adult: boolean;
  vote_average: number;
  title: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  id: number;
  backdrop_path: null | string;
  overview: string;
  poster_path: null | string;
}
