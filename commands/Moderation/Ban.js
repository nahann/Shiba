const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "ban",
  userPermissions: "BAN_MEMBERS",
  args: true,
  guildOnly: true,
  category: `Moderation`,
  usage: "*ban [user]",
  description: `Bans a member from the guild.`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.guild.me.permissions.has("BAN_MEMBERS"))
      return message.reply({
        embed: client.embed(
          {
            description: `Shiba does not have the \`BAN_MEMBERS\` permission.`,
          },
          message
        ),
        allowedMentions: { repliedUser: false },
      });
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "No Reason Provided";
    if (member.bannable) {
      member.ban({ reason: reason });
      message.reply({
        embed: client.embed(
          { description: `${member.user.tag} has been banned` },
          message
        ),
        allowedMentions: { repliedUser: false },
      });
    } else {
      message.reply({
        embeds: [client.embed(
          { description: `I cannot ban this member.` },
          message
        )],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
