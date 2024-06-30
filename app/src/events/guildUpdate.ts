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
      console.log('Failed with guilds:');
      console.log(oldGuild.toJSON());
      console.log(newGuild.toJSON());
      throw err;
    }
  },
};
