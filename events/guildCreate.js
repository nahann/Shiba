const GuildConfig = require("../database/GuildConfig")

module.exports={
    name: "guildCreate",
    run: async (guild, client) => {
        await GuildConfig.create({
            guildName: guild.name,
            guildId: guild.id,
          });
          console.log(`Shiba has joined ${guild.name}. Saved to base`);
    }
  }
  