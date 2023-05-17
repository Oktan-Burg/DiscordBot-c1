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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('account')
        .setDescription('Edit your account information!')
        .addSubcommand(c => c.setName("verify").setDescription("Adds a new account to your user").addStringOption(o => o.setName("name").setDescription("Your roblox account").setRequired(true)))
        .addSubcommand(c => c.setName("unverify").setDescription("Logs out account."))
        .addSubcommand(c => c.setName("switch-account").setDescription("Switch roblox account.")),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    },
};
//# sourceMappingURL=account.js.map