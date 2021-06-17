const { get } = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kannatext",
  description: "make kanna hold text!",
  run: async (client, message, args) => {
    if (!args.length) return message.reply("you need some text there!");
    try {
      const { data } = await get(
        `https://nekobot.xyz/api/imagegen?type=kannagen&text=${args.clean}`
      );
      message.reply({
        embeds: [
          new MessageEmbed().setImage(data.message).setColor("RANDOM"),
        ],
      });
    } catch (err) {
      return console.error(err.message);
    }
  },
};
