const { Client, Message, MessageEmbed, splitMessage } = require("discord.js")
module.exports = {
  name: "status",
  guildOnly: true,
  ownerOnly: true,
  category: `Developer`,
  description: `Evaluate a piece of code.`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
   client.user.setActivity(args.join(" "))
  },
};
