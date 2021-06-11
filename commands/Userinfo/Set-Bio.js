const { Client, Message, MessageEmbed } = require("discord.js");
const UserinfoConfig = require("../../database/Userinfo");

module.exports = {
  name: "set-bio",
  category: `Userinfo`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const bio = args.join(" ");
    const data = await UserinfoConfig.findOne({ userId: message.author.id });
    if (data)
      await UserinfoConfig.findOneAndUpdate(
        { userId: message.author.id },
        { Bio: bio }
      );
    if (!data)
      await UserinfoConfig.create({
        userId: message.author.id,
        Bio: bio,
      });
      message.reply({allowedMentions: {    
        parse: ['everyone', 'users', 'roles'],    
        repliedUser: false,
        }, embed: client.embed({ description: `Bio set to: \`${bio}\``}, message)})
  },
};
