import { User as SQUser, Guild as SQGuild, Channel as SQChannel, VoiceEvent as SQVoiceEvent } from '@time-tracker/database';
import { Channel, Guild, GuildMember } from 'discord.js';

export async function storeMember(member: GuildMember) {
  await SQUser.upsert({ id: member.id, userName: member.displayName });
}

export async function storeChannel(channel: Channel) {
  if (channel.isVoiceBased()) {
    await SQChannel.upsert({ id: channel.id, channelName: channel.name, guildId: channel.guildId });
  }
}

export async function storeGuild(guild: Guild) {
  await SQGuild.upsert({ id: guild.id, guildName: guild.name });
}

export async function storeGuildInfo(guild: Guild) {
  await storeGuild(guild);

  await Promise.all((await guild.channels.fetch()).map(channel => {
    if (channel) return storeChannel(channel);
    else return null;
  }));
}

export async function storeVoiceEvent(member: GuildMember, channelId: string, guild: Guild, type: 'JOIN'|'LEAVE') {
  await storeMember(member);
  await SQVoiceEvent.upsert({ userId: member.id, channelId, guildId: guild.id, eventType: type });
}
