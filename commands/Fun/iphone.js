const { get } = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "iphone",
  description: "make your avatar a iphone!",
  run: async (client, message, args) => {
    const avatar = message.mentions.users.first().displayAvatarURL({ dynamic: false }) || message.author.displayAvatarURL({ dynamic: false }) 
    try {
      const { data } = await get(
        `https://nekobot.xyz/api/imagegen?type=iphonex&url=${avatar}`
      );
      message.reply({ embed: new MessageEmbed()

        .setImage(data.message)
        .setColor('RANDOM')

      });
    } catch (err) {
      return console.error(err.message);
    }
  },
};
