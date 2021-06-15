const { Client, Message, MessageEmbed } = require("discord.js");
const UserinfoConfig = require("../../database/Userinfo");

module.exports = {
  name: "set-bday",
  category: `Userinfo`,
  description: `Sets a birthday to be viewed on your userinfo.`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const bday = args.join(" ")
    await UserinfoConfig.findOneAndUpdate(
      { userId: message.author.id },
      { Bday: bday }
    );
    message.reply({
      embed: client.embed({ description: `Bday set to: \`${bday}\`` }, message),
      allowedMentions: { repliedUser: false },
    });
  },
};
