import { ForumChannel } from "discord.js";
import { Client, GatewayIntentBits, Channel } from "discord.js";

export const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildModeration,
] })

client.on('ready', (c) => {
    console.log("Client Online");
});
