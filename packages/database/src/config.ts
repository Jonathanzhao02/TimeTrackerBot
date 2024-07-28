import { getSecret } from '@time-tracker/secrets';

const PG_USER = getSecret('PG_USER');
const PG_PASS = getSecret('PG_PASS');
const PG_HOST = getSecret('PG_HOST', 'localhost');

export default {
  'development': {
    'username': PG_USER,
    'password': PG_PASS,
    'database': 'snowboy__dev',
    'host': PG_HOST,
    'dialect': 'postgres',
  },
  'test': {
    'username': PG_USER,
    'password': PG_PASS,
    'database': 'snowboy__test',
    'host': PG_HOST,
    'dialect': 'postgres',
  },
  'production': {
    'username': PG_USER,
    'password': PG_PASS,
    'database': 'snowboy__prod',
    'host': PG_HOST,
    'dialect': 'postgres',
  },
};