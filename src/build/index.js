"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
exports.client = new discord_js_1.Client({ intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.GuildModeration,
    ] });
exports.client.on('ready', (c) => {
    console.log("Client Online");
});
//# sourceMappingURL=index.js.map