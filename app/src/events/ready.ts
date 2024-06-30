import { Events } from 'discord.js';
import { ExtendedClient } from '../types';
import deployCommands from '../deploy-commands';
import { storeGuildInfo } from '../db';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: ExtendedClient) {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    deployCommands();

    console.log('Updating all guilds');

    const guilds = await Promise.all((await client.guilds.fetch()).map(guild => guild.fetch()));
    await Promise.all(guilds.map(storeGuildInfo));

    console.log('Updated %d guilds', guilds.length);
  },
};
