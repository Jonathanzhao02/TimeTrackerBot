import { Events, VoiceState } from 'discord.js';

export default {
  name: Events.VoiceStateUpdate,
  once: false,
  execute(oldState: VoiceState, newState: VoiceState) {
    console.log(oldState.toJSON());
    console.log(newState.toJSON());
  },
};
