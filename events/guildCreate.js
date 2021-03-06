const { MessageEmbed } = require("discord.js");
const GuildConfig = require("../database/GuildConfig");

module.exports = {
  name: "guildCreate",
  run: async (guild, client) => {
    await client.user.setActivity(`${client.guilds.cache.size} servers`, { type: "WATCHING" })
    const data = await GuildConfig.findOne({ guildId: guild.id });
    if (!data) {
      await GuildConfig.create({
        guildName: guild.name,
        guildId: guild.id,
      });
    }
    console.log(`Shiba has joined ${guild.name}. Saved to database`);
    const channel = client.guilds.cache
      .find((g) => g.name.includes("Shiba Support"))
      .channels.cache.get("854479020028723210");
    channel.send({
      embeds: [
        new MessageEmbed()
          .setAuthor(`New Server!`, guild.iconURL())
          .addField("Name", guild.name, true)
          .addField("Membercount", guild.memberCount.toString(), true)
          .setThumbnail(guild.iconURL())
          .setColor("RANDOM")
          .setFooter(`${client.user.tag}`, client.user.displayAvatarURL())
          .setTimestamp(),
      ],
    });
  },
};
