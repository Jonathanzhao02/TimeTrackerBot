import type { Client, Collection, SlashCommandBuilder, CommandInteraction, InteractionResponse } from 'discord.js';

type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<InteractionResponse<boolean>>
}

export interface ExtendedClient extends Client {
  commands: Collection<string, Command>
}
