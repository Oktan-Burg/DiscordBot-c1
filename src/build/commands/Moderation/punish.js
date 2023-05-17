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
const discord_js_1 = require("discord.js");
const __1 = require("../..");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("punish")
        .setDescription("Punishes the member!")
        .addUserOption((option) => option
        .setName("target")
        .setDescription("User you want to punish.")
        .setRequired(true))
        .addStringOption((option) => option
        .setName("reason")
        .setDescription("Why you want to punish this user.")
        .setRequired(true))
        .addStringOption((option) => option
        .setName("recommendation")
        .setDescription("What punishment do you recommend?")
        .addChoices({ name: "Kick", value: "kick" }, { name: "Ban", value: "ban" })
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = interaction.options.getUser("target", true);
            const reason = interaction.options.getString("reason", true);
            const recommendation = interaction.options.getString("recommendation", true);
            if (target && reason && recommendation) {
                const guild = yield __1.client.guilds.fetch(process.env.GuildId || "");
                const targetMember = yield guild.members.fetch(target.id);
                if (targetMember.roles.highest.position >
                    (interaction.member).roles.highest.position) {
                    yield targetMember.send(`A user, ${interaction.user.tag} has attempted to punish you and failed.`);
                    return yield interaction.reply({
                        content: "This user's role is higher than yours. Please contact a staff member for assistance.",
                    });
                }
                if (targetMember.roles.cache.has("1108420857702908035")) {
                    return interaction.reply({
                        content: "This user has already been punished.",
                        ephemeral: true,
                    });
                }
                const filePath = path_1.default.join(__dirname, "..", "data", "p_data.json");
                const jsonData = fs_1.default.readFileSync(filePath, "utf-8");
                const existingData = JSON.parse(jsonData);
                if (!existingData[targetMember.id]) {
                    existingData[targetMember.id] = {};
                }
                existingData[targetMember.id]["roles"] = [];
                targetMember.roles.cache.forEach((role) => __awaiter(this, void 0, void 0, function* () {
                    yield targetMember.roles.remove(role.id);
                    existingData[targetMember.id]["roles"].push(role.id);
                }));
                yield targetMember.roles.add(process.env.punishROLE || "");
                const updatedJsonData = JSON.stringify(existingData, null, 2);
                fs_1.default.writeFileSync(filePath, updatedJsonData, "utf-8");
                yield interaction.reply({
                    content: `User <@${targetMember.id}> has been punished.`,
                });
            }
        });
    },
};
//# sourceMappingURL=punish.js.map