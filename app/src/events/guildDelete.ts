import { Events, Guild } from 'discord.js';
// import { deleteGuildInfo } from '../db';

export default {
  name: Events.GuildDelete,
  once: false,
  async execute(guild: Guild) {
    try {
      console.log('Deleting guild');
    }
    catch (err) {
      console.log('Failed with guild:');
      console.log(guild.toJSON());
      throw err;
    }
  },
};
