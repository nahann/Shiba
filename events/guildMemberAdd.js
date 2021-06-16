const WelcomeConfig = require("../database/Welcome"),
  Discord = require("discord.js"),
  ms = require("ms");

module.exports = {
  name: "guildMemberAdd",
  run: async (member, client) => {
    const dataa = await WelcomeConfig.findOne({ guildId: member.guild.id });
    if (!dataa) return;
    if (dataa.toggled === false) return;
    const message = dataa.message;
    const newmsg = message
      .replace("{guild}", member.guild.name)
      .replace("{user}", `<@${member.user.id}>`);
    const channel = dataa.channelId;
    const channeltosend = member.guild.channels.cache.get(channel);
    const role = dataa.roleId;
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
      .setDescription(newmsg)
      .setFooter(`Shiba Welcome System`, client.user.displayAvatarURL())
      .setThumbnail(member.guild.iconURL())
      .setColor("RANDOM")
      .setTimestamp();
    try {
      channeltosend.send({ embeds: [embed] });
      if (role) member.roles.add(role);
    } catch (err) {
      console.log(err);
    }
  },
};
