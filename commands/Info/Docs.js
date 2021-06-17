const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports = {
  name: "docs",
  aliases: ["docs"],
  category: `Info`,
  description: `Get something from the discord.js docs.`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const sq = args.join(" ").split(" --src=");
    const query = sq[0];
    const sr = sq[1] || "stable";
    if (!query) return message.reply("Please specify a query!");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=${sr}&q=${encodeURIComponent(
      query
    )}`;

    axios.get(url).then(({ data }) => {
      if (data) {
        message.channel.send({ embeds: [data] });
      } else {
        message.reply({
          allowedMentions: {
            parse: ["everyone", "users", "roles"],
            repliedUser: false,
          },
          embeds: [client.embed({ description: `Not Found.` }, message)],
          allowedMentions: { repliedUser: false },
        });
      }
    });
  },
};
