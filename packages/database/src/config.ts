import dotenv from 'dotenv';
dotenv.config({ path: process.env.ENV_FILE || '../../.env' });

const { PG_USER, PG_PASS } = process.env;

if (!PG_USER || !PG_PASS) {
  throw new Error('Missing environment variables');
}

export default {
  'development': {
    'username': PG_USER,
    'password': PG_PASS,
    'database': 'snowboy__dev',
    'host': 'db',
    'dialect': 'postgres',
  },
  'test': {
    'username': PG_USER,
    'password': PG_PASS,
    'database': 'snowboy__test',
    'host': 'db',
    'dialect': 'postgres',
  },
  'production': {
    'username': PG_USER,
    'password': PG_PASS,
    'database': 'snowboy__prod',
    'host': 'db',
    'dialect': 'postgres',
  },
};