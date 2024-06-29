import { Pool } from 'pg';
import { VoiceState } from 'discord.js';

const pool = new Pool({ database: 'snowboy' });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function query(text: string, values?: any[]) {
  const client = await pool.connect();
  const res = await client.query(text, values);
  client.release();
  return res;
};

export async function storeStateInfo(state: VoiceState) {
  if (state.member) {
    await query(
      ' \
      INSERT INTO users (id, user_name, created_at) \
      VALUES ($1, $2, $3) \
      ON CONFLICT (id) DO UPDATE SET user_name = EXCLUDED.user_name \
      ',
      [state.member.id, state.member.displayName, new Date()],
    );
  }

  if (state.channel) {
    await query(
      ' \
      INSERT INTO channels (id, channel_name, created_at) \
      VALUES ($1, $2, $3) \
      ON CONFLICT (id) DO UPDATE SET channel_name = EXCLUDED.channel_name \
      ',
      [state.channel.id, state.channel.name, new Date()],
    );
  }

  await query(
    ' \
    INSERT INTO guilds (id, guild_name, created_at) \
    VALUES ($1, $2, $3) \
    ON CONFLICT (id) DO UPDATE SET guild_name = EXCLUDED.guild_name \
    ',
    [state.guild.id, state.guild.name, new Date()],
  );
}

export async function storeVoiceEvent(state: VoiceState, type: 'Join'|'Leave') {
  await query(
    ' \
    INSERT INTO voice_events (user_id, channel_id, guild_id, event_type, created_at) \
    VALUES ($1, $2, $3, $4, $5) \
    ',
    [state.member?.id, state.channel?.id, state.guild.id, type, new Date()],
  );
}
