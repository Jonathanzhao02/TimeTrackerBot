import { Events, VoiceState } from 'discord.js';
import { storeVoiceEvent } from '../db';

export default {
  name: Events.VoiceStateUpdate,
  once: false,
  async execute(oldState: VoiceState, newState: VoiceState) {
    try {
      console.log('Storing new event');

      if (oldState.member && newState.member) {
        if (oldState.channelId == null && newState.channelId != null) {
          await storeVoiceEvent(newState.member, newState.channelId, newState.guild, 'JOIN');
          console.log('Successfully stored join event');
        }
        else if (oldState.channelId != null && newState.channelId == null) {
          await storeVoiceEvent(oldState.member, oldState.channelId, oldState.guild, 'LEAVE');
          console.log('Successfully stored leave event');
        }
        else if (oldState.channelId != null && newState.channelId != null && oldState.channelId != newState.channelId) {
          await storeVoiceEvent(oldState.member, oldState.channelId, oldState.guild, 'LEAVE');
          await storeVoiceEvent(newState.member, newState.channelId, newState.guild, 'JOIN');
          console.log('Successfully stored switch event');
        }
      }
      else {
        console.warn('Strange states found:');
        console.warn(oldState.toJSON());
        console.warn(newState.toJSON());
      }
    }
    catch (err) {
      console.error('Failed with states:');
      console.error(oldState.toJSON());
      console.error(newState.toJSON());
      throw err;
    }
  },
};
