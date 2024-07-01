import { DMChannel, Events, GuildChannel } from 'discord.js';
import { storeChannel } from '../db';

export default {
  name: Events.ChannelUpdate,
  once: false,
  async execute(oldChannel: GuildChannel | DMChannel, newChannel: GuildChannel | DMChannel) {
    try {
      if (oldChannel.isDMBased() || newChannel.isDMBased()) {
        return;
      }

      if (newChannel.isVoiceBased()) {
        if (oldChannel.name != newChannel.name) {
          console.log('Updating channel');
          storeChannel(newChannel);
          console.log('Successfully updated channel');
        }
      }
      else if (oldChannel.isVoiceBased()) {
        console.log('Deleting channel');
      }
    }
    catch (err) {
      console.error('Failed with channels:');
      console.error(oldChannel.toJSON());
      console.error(newChannel.toJSON());
      throw err;
    }
  },
};
