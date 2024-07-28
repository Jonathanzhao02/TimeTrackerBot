import { getSecret } from '@time-tracker/secrets';

const DISCORD_TOKEN = getSecret('DISCORD_TOKEN');
const DISCORD_CLIENT_ID = getSecret('DISCORD_CLIENT_ID');

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
};
