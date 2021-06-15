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
        const channel = client.guilds.cache.find(g => g.name.includes("Shiba Support")).channels.cache.get("852783453606248468")
        channel.send({embed: new MessageEmbed().setTitle("New server!").addField("Name",guild.name,true).addField("Membercount",guild.memberCount,true).setThumbnail(guild.iconURL()).setColor("RANDOM")})   
      }
    }
  }
  