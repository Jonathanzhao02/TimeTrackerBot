import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from './config';
import { commands } from './commands';
import { events } from './events';
import type { ExtendedClient } from './types.d';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] }) as ExtendedClient;
client.commands = new Collection();

Object.values(commands).forEach(command => client.commands.set(command.data.name, command));
Object.values(events).forEach(event => {
  if (event.once) {
    client.once(<string>event.name, event.execute);
  }
  else {
    client.on(<string>event.name, event.execute);
  }
});

// Log in to Discord with your client's token
client.login(config.DISCORD_TOKEN);
