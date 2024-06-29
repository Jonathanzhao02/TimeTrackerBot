import { Events } from 'discord.js';
import { ExtendedClient } from '../types';
import deployCommands from '../deploy-commands';

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: ExtendedClient) {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    deployCommands();
  },
};
