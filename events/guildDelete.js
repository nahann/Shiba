const GuildConfig = require("../database/GuildConfig")

module.exports={
    name: "guildDelete",
    run: async (guild, client) => {
        await GuildConfig.findOneAndDelete({ guildId: guild.id });
        console.log(`Shiba has left ${guild.name}. Deleted from base`);
        await WelcomeConfig.findOneAndDelete({ guildId: guild.id });
        console.log(`Welcome config deleted from base.`);
    }
  }
  