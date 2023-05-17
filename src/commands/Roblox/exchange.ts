import { SlashCommandBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exchange')
        .setDescription('Robux USD exchange rate!')
        .addSubcommand(command =>
            command.setName("usd").setDescription("Convert USD to RBX")
                .addNumberOption(o => o.setName("amount").setDescription("Amount of USD").setRequired(true))
        )
        .addSubcommand(command =>
            command.setName("robux").setDescription("Convert RBX to USD")
                .addNumberOption(o => o.setName("amount").setDescription("Amount of Robux").setRequired(true))
        ),
    async execute(interaction: any) {
        const command = interaction.options.getSubcommand();
        const amount: number = interaction.options.getNumber("amount");
        if (command === "usd") {
            return await interaction.reply("$" + amount.toString() + " is equal to " + (amount / 0.0035).toFixed(0).toString() + "(R)");
        } else {
            return await interaction.reply(amount.toString() + "(R) is equal to $" + (amount * 0.0035).toFixed(0).toString());
        }
    },
};
