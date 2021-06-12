
const { Client, Message, MessageEmbed, splitMessage } = require("discord.js");
const { inspect } = require("util")
module.exports = {
  name: "test",
  guildOnly: true,
  ownerOnly: true,
  category: `Developer`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
  message.reply('pp')
  },
};
