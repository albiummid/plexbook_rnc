export interface TSeriesListItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface TSeriesDetails {
  backdrop_path: string;
  created_by: Createdby[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Lastepisodetoair;
  name: string;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Productioncompany[];
  production_countries: Productioncountry[];
  seasons: Season[];
  spoken_languages: Spokenlanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

interface Spokenlanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

interface Productioncountry {
  iso_3166_1: string;
  name: string;
}

interface Productioncompany {
  name: string;
  id: number;
  logo_path: null | string;
  origin_country: string;
}

interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

interface Lastepisodetoair {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

interface Createdby {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface SeasonDetails {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
}

export interface Episode {
  air_date: string;
  episode_number: number;
  crew: Crew[];
  guest_stars: Gueststar[];
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface Gueststar {
  credit_id: string;
  order: number;
  character: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
}

interface Crew {
  department: string;
  job: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
}

export interface SeasonEpisodeDetails {
  air_date: string;
  crew: Crew[];
  episode_number: number;
  guest_stars: Gueststar[];
  name: string;
  overview: string;
  id: number;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface Gueststar {
  id: number;
  name: string;
  credit_id: string;
  character: string;
  order: number;
  profile_path: string | null;
}

interface Crew {
  id: number;
  credit_id: string;
  name: string;
  department: string;
  job: string;
  profile_path: null | string;
}
