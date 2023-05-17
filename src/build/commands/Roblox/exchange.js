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
        .setName('exchange')
        .setDescription('Robux USD exchange rate!')
        .addSubcommand(command => command.setName("usd").setDescription("Convert USD to RBX")
        .addNumberOption(o => o.setName("amount").setDescription("Amount of USD").setRequired(true)))
        .addSubcommand(command => command.setName("robux").setDescription("Convert RBX to USD")
        .addNumberOption(o => o.setName("amount").setDescription("Amount of Robux").setRequired(true))),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = interaction.options.getSubcommand();
            const amount = interaction.options.getNumber("amount");
            if (command === "usd") {
                return yield interaction.reply("$" + amount.toString() + " is equal to " + (amount / 0.0035).toFixed(0).toString() + "(R)");
            }
            else {
                return yield interaction.reply(amount.toString() + "(R) is equal to $" + (amount * 0.0035).toFixed(0).toString());
            }
        });
    },
};
//# sourceMappingURL=exchange.js.map