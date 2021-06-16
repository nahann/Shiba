const GuildConfig = require("../database/GuildConfig")
const WelcomeConfig = require('../database/Welcome')
const { MessageEmbed } = require("discord.js")
module.exports={
    name: "guildDelete",
    run: async (guild, client) => {
        await GuildConfig.findOneAndDelete({ guildId: guild.id });
        console.log(`Shiba has left ${guild.name}. Deleted from base`);
        await WelcomeConfig.findOneAndDelete({ guildId: guild.id });
        console.log(`Welcome config deleted from base.`);
        const channel = client.guilds.cache.find(g => g.name.includes("Shiba Support")).channels.cache.get("854479020028723210"); 
        channel.send({embed: new MessageEmbed()
                      .setAuthor(`We lost a server.`, guild.iconURL())
                      .addField("Name",guild.name,true)
                      .addField("Membercount",guild.memberCount.toString(),true)
                      .setThumbnail(guild.iconURL())
                      .setColor("RANDOM")
                      .setFooter(`${client.user.tag}`, client.user.displayAvatarURL())
                      .setTimestamp()})   
    }
  }
  
