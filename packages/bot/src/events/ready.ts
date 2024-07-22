import { Events, NonThreadGuildBasedChannel } from 'discord.js';
import sequelize from '@time-tracker/database';
import { ExtendedClient } from '../types';
import deployCommands from '../deploy-commands';
import { storeGuildInfo, storeVoiceEvent } from '../db';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: ExtendedClient) {
    let nMembers = 0;
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    deployCommands();

    await sequelize.sync();

    console.log('Updating all guilds');

    const guilds = await Promise.all((await client.guilds.fetch()).map(guild => guild.fetch()));
    await Promise.all(guilds.map(storeGuildInfo));

    const channels = (await Promise.all(guilds.map(guild => guild.channels.fetch()))).reduce(
      (p, c) => p.concat(<NonThreadGuildBasedChannel[]>Array.from(c.filter(e => e != null).values())),
      <NonThreadGuildBasedChannel[]>[],
    );

    await Promise.all(channels.map(channel => {
      if (channel.isVoiceBased()) {
        nMembers += channel.members.size;
        return channel.members.map(member => storeVoiceEvent(member, channel.id, channel.guild, 'JOIN'));
      }
      else {
        return null;
      }
    }));

    console.log('Updated %d guilds, %d channels, %d members', guilds.length, channels.length, nMembers);
  },
};
