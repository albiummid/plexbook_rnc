import {cleanEnv, str} from 'envalid';

const env = cleanEnv(process.env, {
  TMDB_API_KEY: str({
    default: '',
    docs: 'TMDB API KEY is needed to run this app',
  }),
});

export default env;
