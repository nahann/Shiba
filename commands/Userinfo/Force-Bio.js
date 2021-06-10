const { Client, Message, MessageEmbed } = require("discord.js");
const UserinfoConfig = require("../../database/Userinfo");

module.exports = {
  name: "force-bio",
  ownerOnly: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.users.first();
    const bio = args.slice(1).join(" ");
    const data = await UserinfoConfig.findOne({ userId: member.id });
    if (data)
      await UserinfoConfig.findOneAndUpdate(
        { userId: member.id },
        { Bio: bio }
      );
    if (!data)
      await UserinfoConfig.create({
        userId: member.id,
        Bio: bio,
      });
    message.lineReplyNoMention(
      client.embed(
        { description: `${member.username}'s bio set to: \`${bio}\`` },
        message
      )
    );
  },
};
