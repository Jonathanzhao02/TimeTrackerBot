import { Events, VoiceState } from 'discord.js';
import { storeVoiceEvent } from '../db';

export default {
  name: Events.VoiceStateUpdate,
  once: false,
  async execute(oldState: VoiceState, newState: VoiceState) {
    try {
      console.log('Storing new event');

      if (oldState.channel == null && newState.channel != null) {
        await storeVoiceEvent(newState, 'Join');
        console.log('Successfully stored join event');
      }
      else if (oldState.channel != null && newState.channel == null) {
        await storeVoiceEvent(oldState, 'Leave');
        console.log('Successfully stored leave event');
      }
      else if (oldState.channel != null && newState.channel != null && oldState.channel != newState.channel) {
        await storeVoiceEvent(oldState, 'Leave');
        await storeVoiceEvent(newState, 'Join');
        console.log('Successfully stored switch event');
      }
    }
    catch (err) {
      console.log('Failed with states:');
      console.log(oldState.toJSON());
      console.log(newState.toJSON());
      throw err;
    }
  },
};
