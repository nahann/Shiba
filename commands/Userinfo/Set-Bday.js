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
    const bday = args[0];
    await UserinfoConfig.findOneAndUpdate(
      { userId: message.author.id },
      { Bday: bday }
    );
    message.reply({allowedMentions: {    
      parse: ['everyone', 'users', 'roles'],    
      repliedUser: false,
      }, embed: client.embed({ description: `Bday set to: \`${bday}\``}, message)})
  },
};
