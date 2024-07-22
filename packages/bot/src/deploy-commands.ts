import { REST, Routes } from 'discord.js';
import { config } from './config';
import { commands } from './commands';

const commandData = Object.values(commands).map(c => c.data.toJSON());

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.DISCORD_TOKEN);

// and deploy your commands!
export default (async () => {
  try {
    console.log(`Started refreshing ${commandData.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = <Array<unknown>> await rest.put(
      Routes.applicationCommands(config.DISCORD_CLIENT_ID),
      { body: commandData },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  }
  catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
});