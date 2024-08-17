import {cleanEnv, str} from 'envalid';

const env = cleanEnv(process.env, {
  TMDB_API_KEY: str({default: ''}),
});

export default env;
