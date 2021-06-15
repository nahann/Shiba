const { MessageEmbed } = require("discord.js");
const GuildConfig = require("../database/GuildConfig")

module.exports={
    name: "guildCreate",
    run: async (guild, client) => {
      const data = await GuildConfig.findOne({ guildId: guild.id })
      if(!data) {
        await GuildConfig.create({
          guildName: guild.name,
          guildId: guild.id,
        });
        console.log(`Shiba has joined ${guild.name}. Saved to base`);
      }
    }
  }
  