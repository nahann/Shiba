const { Client, Message, MessageEmbed } = require("discord.js");
const UserinfoConfig = require("../../database/Userinfo");

module.exports = {
  name: "set-color",
  category: `Userinfo`,
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
    message.reply({allowedMentions: {    
      parse: ['everyone', 'users', 'roles'],    
      repliedUser: false,
      }, embed: client.embed({ description: `Color set to: \`${color}\``}, message)})
  },
};
