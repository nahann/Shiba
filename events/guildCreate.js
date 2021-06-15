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
      }
        console.log(`Shiba has joined ${guild.name}. Saved to base`);
        const channel = client.guilds.cache.find(g => g.name.includes("Shiba Support")).channels.cache.get("854479020028723210")
        channel.send({embed: new MessageEmbed().setAuthor(`New Server!`, guild.iconURL()).addField("Name",guild.name,true).addField("Membercount",guild.memberCount.toString(),true).setThumbnail(guild.iconURL()).setColor("RANDOM").setFooter(`${client.user.tag}`, client.user.displayAvatarURL()).setTimestamp()})   
    }
  }
