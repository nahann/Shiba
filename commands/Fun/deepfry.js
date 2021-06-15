const { get } = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "deepfry",
  description: "😁😀🤣🔥",
  run: async (client, message, args) => {
    const avatar = message.mentions.users.first().displayAvatarURL({ dynamic: false }) || message.author.displayAvatarURL({ dynamic: false }) 
    try {
      const { data } = await get(
        `https://nekobot.xyz/api/imagegen?type=deepfry&url=${avatar}`
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
