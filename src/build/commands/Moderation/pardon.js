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
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: node_path_1.default.join(__dirname, "..", "..", ".env") });
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("pardon")
        .setDescription("Pardons a member!")
        .addUserOption((option) => option
        .setName("target")
        .setDescription("User you want to punish.")
        .setRequired(true))
        .addStringOption((option) => option
        .setName("reason")
        .setDescription("Why you want to pardon this user.")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = interaction.options.getUser("target", true);
            const reason = interaction.options.getString("reason", true);
            if (target && reason) {
                const guild = __1.client.guilds.fetch(process.env.GuildId || "");
                var targetmember = (yield guild).members.fetch(target.id);
                if (!(yield targetmember).roles.cache.has(process.env.punishROLE || "")) {
                    return yield interaction.reply({
                        content: "This user has already been pardoned",
                        ephemeral: true
                    });
                }
                (yield targetmember).roles.remove(process.env.punishROLE || "");
                const filePath = node_path_1.default.join(process.cwd(), "build", "commands", "Moderation", "data", "p_data.json");
                var jsondata = node_fs_1.default.readFileSync(filePath, 'utf-8');
                var existingdata = JSON.parse(jsondata);
                var id = (yield targetmember).id;
                existingdata[id].roles.forEach((role) => __awaiter(this, void 0, void 0, function* () {
                    (yield targetmember).roles.add(role);
                }));
                delete existingdata[id];
                const updatedJsonData = JSON.stringify(existingdata, null, 2);
                node_fs_1.default.writeFileSync(filePath, updatedJsonData, 'utf-8');
                yield interaction.reply({
                    content: `User <@${(yield targetmember).id}> has been pardoned`,
                });
            }
        });
    },
};
//# sourceMappingURL=pardon.js.map