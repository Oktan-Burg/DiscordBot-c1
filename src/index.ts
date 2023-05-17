import { Collection, GatewayIntentBits, REST, Routes } from "discord.js";
import dotenv from 'dotenv';
import { Client } from "discord.js";
import path from "path";
import fs from "node:fs";
dotenv.config();

class BotClient extends Client {
  commands: Collection<string, any>;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildModeration,
      ],
    });
    this.commands = new Collection<string, any>();
  }
}

export const client: BotClient = new BotClient();

client.on('ready', (c) => {
  console.log("Client Online")
});

const commandsPath = path.join(__dirname, "commands");

function loadCommands(directory: any) {
  const commandFiles = fs.readdirSync(directory);

  for (const file of commandFiles) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively load commands from subdirectories
      loadCommands(filePath);
    } else if (stats.isFile() && file.endsWith(".js")) {
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
}

loadCommands(commandsPath);

function loadCommands2(directory: any, commands: any[]) {
  const commandFiles = fs.readdirSync(directory);

  for (const file of commandFiles) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively load commands from subdirectories
      loadCommands2(filePath, commands);
    } else if (stats.isFile() && file.endsWith(".js")) {
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
}

const commands: any[] = [];
const foldersPath = path.join(__dirname, "commands");
loadCommands2(foldersPath, commands);

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN || "");

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      Routes.applicationGuildCommands(
        process.env.ClientId || "",
        process.env.GuildId || ""
      ),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


client.login(process.env.TOKEN);
