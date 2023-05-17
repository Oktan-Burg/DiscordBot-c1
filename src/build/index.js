"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_2 = require("discord.js");
const path_1 = __importDefault(require("path"));
const node_fs_1 = __importDefault(require("node:fs"));
dotenv_1.default.config();
class BotClient extends discord_js_2.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMembers,
                discord_js_1.GatewayIntentBits.DirectMessages,
                discord_js_1.GatewayIntentBits.GuildModeration,
            ],
        });
        this.commands = new discord_js_1.Collection();
    }
}
exports.client = new BotClient();
exports.client.on("ready", () => {
    console.log("Client Online");
});
const commandsPath = path_1.default.join(__dirname, "commands");
function loadCommands(directory) {
    const commandFiles = node_fs_1.default.readdirSync(directory);
    for (const file of commandFiles) {
        const filePath = path_1.default.join(directory, file);
        const stats = node_fs_1.default.statSync(filePath);
        if (stats.isDirectory()) {
            loadCommands(filePath);
        }
        else if (stats.isFile() && file.endsWith(".js")) {
            const command = require(filePath);
            if ("data" in command && "execute" in command) {
                exports.client.commands.set(command.data.name, command);
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}
loadCommands(commandsPath);
function loadCommands2(directory, commands) {
    const commandFiles = node_fs_1.default.readdirSync(directory);
    for (const file of commandFiles) {
        const filePath = path_1.default.join(directory, file);
        const stats = node_fs_1.default.statSync(filePath);
        if (stats.isDirectory()) {
            loadCommands2(filePath, commands);
        }
        else if (stats.isFile() && file.endsWith(".js")) {
            const command = require(filePath);
            if ("data" in command && "execute" in command) {
                commands.push(command.data.toJSON());
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}
const commands = [];
const foldersPath = path_1.default.join(__dirname, "commands");
loadCommands2(foldersPath, commands);
const rest = new discord_js_1.REST().setToken(process.env.TOKEN || "");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = yield rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.ClientId || "", process.env.GuildId || ""), { body: commands });
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        console.error(error);
    }
}))();
exports.client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    const command = exports.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        yield command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            yield interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        else {
            yield interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}));
exports.client.login(process.env.TOKEN);
//# sourceMappingURL=index.js.map