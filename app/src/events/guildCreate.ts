import { Events, Guild } from 'discord.js';
import { storeGuildInfo } from '../db';

export default {
  name: Events.GuildCreate,
  once: false,
  async execute(guild: Guild) {
    try {
      console.log('Storing new guild');
      await storeGuildInfo(guild);
      console.log('Successfully stored guild');
    }
    catch (err) {
      console.log('Failed with guild:');
      console.log(guild.toJSON());
      throw err;
    }
  },
};
