import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  execute: async (interaction: CommandInteraction) => {
    return interaction.reply('Pong!');
  },
};
