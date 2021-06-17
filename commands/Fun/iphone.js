const { get } = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "iphone",
  description: "make your avatar a iphone!",
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.displayAvatarURL();
    try {
      const { data } = await get(
        `https://nekobot.xyz/api/imagegen?type=iphonex&url=${avatar}`
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
