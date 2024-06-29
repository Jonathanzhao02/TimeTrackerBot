import { Events, VoiceState } from 'discord.js';
import { storeStateInfo, storeVoiceEvent } from '../db';

export default {
  name: Events.VoiceStateUpdate,
  once: false,
  async execute(oldState: VoiceState, newState: VoiceState) {
    console.log('Storing new event');
    console.log(oldState.toJSON());
    console.log(newState.toJSON());

    await storeStateInfo(oldState);
    await storeStateInfo(newState);

    console.log('Successfully stored state info');

    if (oldState.channel == null && newState.channel != null) {
      await storeVoiceEvent(newState, 'Join');
      console.log('Successfully stored join event');
    }
    else if (oldState.channel != null && newState.channel == null) {
      await storeVoiceEvent(oldState, 'Leave');
      console.log('Successfully stored leave event');
    }
  },
};
