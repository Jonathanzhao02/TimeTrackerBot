import ready from './ready';
import interactionCreate from './interactionCreate';
import voiceStateUpdate from './voiceStateUpdate';
import guildCreate from './guildCreate';
import guildDelete from './guildDelete';
import guildUpdate from './guildUpdate';
import channelCreate from './channelCreate';
import channelDelete from './channelDelete';
import channelUpdate from './channelUpdate';

export const events = {
  ready,
  interactionCreate,
  voiceStateUpdate,
  guildCreate,
  guildDelete,
  guildUpdate,
  channelCreate,
  channelDelete,
  channelUpdate,
};
