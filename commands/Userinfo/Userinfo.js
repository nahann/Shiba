const { Client, Message, MessageEmbed } = require("discord.js");
const UserinfoConfig = require("../../database/Userinfo");

module.exports = {
  name: "userinfo",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.member;
    const data = await UserinfoConfig.findOne({ userId: member.user.id });
    const info = [];
    if (data) info.push(data.get("Bio"));
    if (!data) info.push(`Bio Not Set`);
    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);
    const embed = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setThumbnail(member.user.displayAvatarURL())
      .setColor("RANDOM")
      .setFooter(`ID: ` + member.user.id)
      .setTimestamp()
      .addFields(
        {
          name: `» Joined At`,
          value: `${member.joinedAt.toDateString()}`,
          inline: true,
        },
        {
          name: `» Account Created`,
          value: `${member.user.createdAt.toDateString()}`,
          inline: true,
        },
        {
          name: `» Roles [${roles.length}]`,
          value: `${
            roles.length < 10
              ? roles.join(" ,")
              : roles.lenth > 10
              ? client.utils.trimArray(roles)
              : "None"
          }`,
        },
        {
          name: `» User Bio`,
          value: `Bio: ${info}`,
        },
        {
          name: `» Logged In On Devices [${
            Object.entries(member.user.presence?.clientStatus || {}).length
          }]`,
          value: `
${Object.entries(member.user.presence?.clientStatus || {})
  .map(
    (value, index) =>
      `
                            Device${
                              Object.entries(member.user.presence.clientStatus)
                                .length > 1
                                ? ` [${index + 1}]:`
                                : ":"
                            } **${
        value[0][0].toUpperCase() + value[0].slice(1)
      }**`
  )
  .join("")}
                    `.trim(),
        }
      );

    message.lineReplyNoMention(embed);
  },
};
