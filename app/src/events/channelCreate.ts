import { Events, GuildChannel } from 'discord.js';
import { storeChannel } from '../db';

export default {
  name: Events.ChannelCreate,
  once: false,
  async execute(channel: GuildChannel) {
    try {
      if (channel.isVoiceBased()) {
        console.log('Storing new channel');
        await storeChannel(channel);
        console.log('Successfully stored channel');
      }
    }
    catch (err) {
      console.log('Failed with channel:');
      console.log(channel.toJSON());
      throw err;
    }
  },
};
