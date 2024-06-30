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
      console.log('Failed with channels:');
      console.log(oldChannel.toJSON());
      console.log(newChannel.toJSON());
      throw err;
    }
  },
};
