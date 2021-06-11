const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports = {
  name: "docs",
  aliases: ["docs"],
  category: `Info`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return message.reply("Please specify a query!");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;

    axios.get(url).then(({ data }) => {
      if (data) {
        message.channel.send({ embed: data });
      } else {
        message.reply({allowedMentions: {    
          parse: ['everyone', 'users', 'roles'],    
          repliedUser: false,
          }, embed: client.embed({ description: `Not Found.`}, message)})
      }
    });
  },
};
