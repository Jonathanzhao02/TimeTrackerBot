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
      console.log('Failed with channel:');
      console.log(channel.toJSON());
      throw err;
    }
  },
};
