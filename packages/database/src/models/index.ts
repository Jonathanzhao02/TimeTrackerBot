import userInit, { User } from './user';
import guildInit, { Guild } from './guild';
import channelInit, { Channel } from './channel';
import voiceEventInit, { VoiceEvent } from './voiceEvent';

export const inits = { userInit, guildInit, channelInit, voiceEventInit };
export const associations = { User, Guild, Channel, VoiceEvent };
