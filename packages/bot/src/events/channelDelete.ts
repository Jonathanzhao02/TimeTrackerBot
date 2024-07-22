import { DMChannel, Events, GuildChannel } from 'discord.js';
// import { deleteChannelInfo } from '../db';

export default {
  name: Events.ChannelDelete,
  once: false,
  async execute(channel: GuildChannel | DMChannel) {
    try {
      console.log('Deleting channel');
    }
    catch (err) {
      console.error('Failed with channel:');
      console.error(channel.toJSON());
      throw err;
    }
  },
};
