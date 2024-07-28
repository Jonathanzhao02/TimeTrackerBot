import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: process.env.ENV_FILE || '../../.env' });
const USE_SECRETS = process.env.USE_SECRETS === '1';

export const getSecret = function(name: string, defaultValue?: string): string {
  if (USE_SECRETS) {
    const secretPath = process.env[name + '_FILE'];

    if (!secretPath) {
      if (defaultValue) return defaultValue;
      throw new Error('Missing environment path variable ' + name + '_FILE');
    }
    else {
      return fs.readFileSync(secretPath).toString('utf8');
    }
  }
  else if (!process.env[name]) {
    if (defaultValue) return defaultValue;
    throw new Error('Missing environment variable ' + name);
  }
  else {
    return process.env[name];
  }
};
