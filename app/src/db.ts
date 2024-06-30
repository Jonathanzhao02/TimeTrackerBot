import { Pool } from 'pg';
import { Channel, Guild, GuildMember, VoiceState } from 'discord.js';

const pool = new Pool({ database: 'snowboy' });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function query(text: string, values?: any[]) {
  const client = await pool.connect();
  const res = await client.query(text, values);
  client.release();
  return res;
};

export async function storeMember(member: GuildMember) {
  await query(
    ' \
    INSERT INTO users (id, user_name, created_at) \
    VALUES ($1, $2, $3) \
    ON CONFLICT (id) DO UPDATE SET user_name = EXCLUDED.user_name \
    ',
    [member.id, member.displayName, new Date()],
  );
}

export async function storeChannel(channel: Channel) {
  if (channel.isVoiceBased()) {
    await query(
      ' \
      INSERT INTO channels (id, channel_name, guild_id, created_at) \
      VALUES ($1, $2, $3, $4) \
      ON CONFLICT (id) DO UPDATE SET channel_name = EXCLUDED.channel_name \
      ',
      [channel.id, channel.name, channel.guildId, new Date()],
    );
  }
}

export async function storeGuild(guild: Guild) {
  await query(
    ' \
    INSERT INTO guilds (id, guild_name, created_at) \
    VALUES ($1, $2, $3) \
    ON CONFLICT (id) DO UPDATE SET guild_name = EXCLUDED.guild_name \
    ',
    [guild.id, guild.name, new Date()],
  );
}

export async function storeGuildInfo(guild: Guild) {
  await storeGuild(guild);

  await Promise.all((await guild.channels.fetch()).map(channel => {
    if (channel) return storeChannel(channel);
    else return null;
  }));
}

export async function storeVoiceEvent(state: VoiceState, type: 'Join'|'Leave') {
  if (state.member) {
    await storeMember(state.member);

    await query(
      ' \
      INSERT INTO voice_events (user_id, channel_id, guild_id, event_type, created_at) \
      VALUES ($1, $2, $3, $4, $5) \
      ',
      [state.member.id, state.channelId, state.guild.id, type, new Date()],
    );
  }
}
