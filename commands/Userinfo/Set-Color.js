const { Client, Message, MessageEmbed } = require("discord.js");
const UserinfoConfig = require("../../database/Userinfo");

module.exports = {
  name: "set-color",
  category: `Userinfo`,
  description: `Sets a color for the embed of your userinfo. Default is random.`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const color = args[0].toUpperCase();
    await UserinfoConfig.findOneAndUpdate(
      { userId: message.author.id },
      { Color: color }
    );
    message.reply({
      embeds: [
        client.embed({ description: `Color set to: \`${color}\`` }, message),
      ],
      allowedMentions: { repliedUser: false },
    });
  },
};
