import {
    SlashCommandBuilder,
    CommandInteraction,
    GuildMember,
    User,
    Client,
  } from "discord.js";
  import { client } from "../..";
  import fs from "node:fs"
  import path from "node:path"
  import dotenv from "dotenv";
  
  dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("pardon")
      .setDescription("Pardons a member!")
      .addUserOption((option) =>
        option
          .setName("target")
          .setDescription("User you want to punish.")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("Why you want to pardon this user.")
          .setRequired(true)
      ),
    async execute(interaction: any) {
      const target: User | null = interaction.options.getUser("target", true);
      const reason: string | null = interaction.options.getString("reason", true);
  
      if (target && reason) {
        const guild = client.guilds.fetch(process.env.GuildId || "");
        var targetmember = (await guild).members.fetch(target.id);
        if (!(await targetmember).roles.cache.has(process.env.punishROLE || "")) {
          return await interaction.reply({
              content: "This user has already been pardoned",
              ephemeral: true
          })
        }
        /////////////////////////////////////////////////////////
        (await targetmember).roles.remove(process.env.punishROLE || "")
        const filePath = path.join(process.cwd(), "build", "commands", "Moderation", "data", "p_data.json");
      var jsondata = fs.readFileSync(filePath, 'utf-8')    
        var existingdata = JSON.parse(jsondata);
        var id = (await targetmember).id;
        existingdata[id].roles.forEach(async (role: string) => {
            (await targetmember).roles.add(role)
        });
        delete existingdata[id]
        const updatedJsonData = JSON.stringify(existingdata, null, 2);
        fs.writeFileSync(filePath,updatedJsonData, 'utf-8')
        await interaction.reply({
            content: `User <@${(await targetmember).id}> has been pardoned`,
            
          })
      }
    },
  };
  