const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  aliases: ["clear"],
  guildOnly: true,
  args: true,
  usage: `*purge [number of messages]`,
  category: `Moderation`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const purge = args[0];
    if (isNaN(purge))
      return message.reply(
        client.embed({ description: `Provide a real number.` }, message)
      );
    if (purge > 99)
      return message.reply(
        client.embed(
          { description: `You cannot delete more than 99 memssages` },
          message
        )
      );
    message.channel.bulkDelete(purge);
    message.reply({allowedMentions: {    
      parse: ['everyone', 'users', 'roles'],    
      repliedUser: false,
      }, embed: client.embed({ description: `${purge} messages have been deleted.`}, message)})
  },
};
