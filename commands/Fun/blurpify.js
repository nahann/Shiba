const { get } = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "blurpify",
  description: "b l u r p u l",
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.displayAvatarURL()
    try {
      const { data } = await get(
        `https://nekobot.xyz/api/imagegen?type=blurpify&image=${avatar}`
      );
      message.reply({ embed: new MessageEmbed()

        .setImage(data.message)
        .setColor('RANDOM')
        .setAuthor(`${user.username} has been blurpified!`)

      });
    } catch (err) {
      return console.error(err.message);
    }
  },
};
