import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('account')
		.setDescription('Edit your account information!')
        .addSubcommand(c => c.setName("verify").setDescription("Adds a new account to your user").addStringOption(o => o.setName("name").setDescription("Your roblox account").setRequired(true)))
        .addSubcommand(c=> c.setName("unverify").setDescription("Logs out account."))
        .addSubcommand(c=>c.setName("switch-account").setDescription("Switch roblox account.")),
	async execute(interaction: CommandInteraction) {
		
	},
};
