-- Run with `sudo -u postgres psql`
DROP DATABASE IF EXISTS snowboy;
CREATE DATABASE snowboy;
\c snowboy;

CREATE TYPE event_type AS ENUM('Join', 'Leave');

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY,
  user_name VARCHAR(32) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS guilds (
  id BIGINT PRIMARY KEY,
  guild_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS channels (
  id BIGINT PRIMARY KEY,
  channel_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS voice_events (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  channel_id BIGINT REFERENCES channels(id) NOT NULL,
  guild_id BIGINT REFERENCES guilds(id) NOT NULL,
  event_type event_type NOT NULL,
  created_at TIMESTAMP NOT NULL
);
