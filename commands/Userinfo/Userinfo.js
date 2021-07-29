const { Client, Message, MessageEmbed } = require("discord.js");
const UserinfoConfig = require("../../database/Userinfo");

module.exports = {
  name: "userinfo",
  category: `Userinfo`,
  description: `Displays info on a user.`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.member;
    const data = await UserinfoConfig.findOne({ userId: member.user.id });
    const bio = [];
    const color = [];
    const bday = [];
    if (data) {
      bio.push(data.get("Bio"));
      color.push(data.get("Color"));
      bday.push(data.get("Bday"));
    }
    if (!data) {
      color.push("WHITE");
      bio.push(`Bio Not Set`);
      bday.push(`Bday Not Set`);
    }
    console.log(await bio)
    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);
    const embed = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setThumbnail(member.user.displayAvatarURL())
      .setColor(`${color}`)
      .setFooter(` ID: ` + member.user.id)
      .setTimestamp()
      .addFields(
        {
          name: `» Joined At`,
          value: `${member.joinedAt.toDateString()} ${member.joinedAt.toLocaleTimeString()} (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`,
          inline: true,
        },
        {
          name: `» Account Created`,
          value: `${member.user.createdAt.toDateString()} ${member.user.createdAt.toLocaleTimeString()} (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`,
          inline: true,
        },
        {
          name: `» Roles [${roles.length}]`,
          value: `Roles: ${
            roles.length < 10
              ? roles.join(" ,")
              : roles.length > 10
              ? client.trimArray(roles,10)
              : "None"
          }`,
        },
        {
          name: `» User Bio`,
          value: `${bio}`,
        },
        {
          name: `» User Birthday`,
          value: `${bday}`,
        },
        {
          name: `» User Avatar`,
          value: `[[Avatar Link]](${member.user.displayAvatarURL()})`,
        },
      );
    message.reply({ embeds: [embed] });
  },
};
