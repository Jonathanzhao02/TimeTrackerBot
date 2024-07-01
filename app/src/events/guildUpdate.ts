import { Events, Guild } from 'discord.js';
import { storeGuild } from '../db';

export default {
  name: Events.GuildUpdate,
  once: false,
  async execute(oldGuild: Guild, newGuild: Guild) {
    try {
      if (oldGuild.name != newGuild.name) {
        console.log('Updating guild');
        storeGuild(newGuild);
        console.log('Successfully updated guild');
      }
    }
    catch (err) {
      console.error('Failed with guilds:');
      console.error(oldGuild.toJSON());
      console.error(newGuild.toJSON());
      throw err;
    }
  },
};
