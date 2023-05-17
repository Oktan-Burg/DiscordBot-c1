import {
    SlashCommandBuilder,
    CommandInteraction,
    GuildMember,
    User,
    Client,
  } from "discord.js";
  import { client } from "../..";
  import fs from "fs";
  import path from "path";
  import dotenv from "dotenv";
  
  dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("punish")
      .setDescription("Punishes the member!")
      .addUserOption((option) =>
        option
          .setName("target")
          .setDescription("User you want to punish.")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("Why you want to punish this user.")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("recommendation")
          .setDescription("What punishment do you recommend?")
          .addChoices(
            { name: "Kick", value: "kick" },
            { name: "Ban", value: "ban" }
          )
          .setRequired(true)
      ),
    async execute(interaction: any) {
      const target = interaction.options.getUser("target", true);
      const reason = interaction.options.getString("reason", true);
      const recommendation = interaction.options.getString("recommendation", true);
  
      if (target && reason && recommendation) {
        const guild = await client.guilds.fetch(process.env.GuildId || "");
        const targetMember = await guild.members.fetch(target.id);
  
        if (
          targetMember.roles.highest.position >
          (interaction.member).roles.highest.position
        ) {
          await targetMember.send(
            `A user, ${interaction.user.tag} has attempted to punish you and failed.`
          );
          return await interaction.reply({
            content:
              "This user's role is higher than yours. Please contact a staff member for assistance.",
          });
        }
  
        if (targetMember.roles.cache.has("1108420857702908035")) {
          return interaction.reply({
            content: "This user has already been punished.",
            ephemeral: true,
          });
        }
  
        const filePath = path.join(
          __dirname,
          "..",
          "data",
          "p_data.json"
        );
  
        const jsonData = fs.readFileSync(filePath, "utf-8");
        const existingData = JSON.parse(jsonData);
  
        if (!existingData[targetMember.id]) {
          existingData[targetMember.id] = {}; // Create an empty object if it doesn't exist
        }
  
        existingData[targetMember.id]["roles"] = [];
        targetMember.roles.cache.forEach(async (role) => {
          await targetMember.roles.remove(role.id);
          existingData[targetMember.id]["roles"].push(role.id);
        });
  
        await targetMember.roles.add(process.env.punishROLE || "");
  
        const updatedJsonData = JSON.stringify(existingData, null, 2);
        fs.writeFileSync(filePath, updatedJsonData, "utf-8");
  
        await interaction.reply({
          content: `User <@${targetMember.id}> has been punished.`,
        });
      }
    },
  };
  