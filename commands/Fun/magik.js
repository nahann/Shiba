const { get } = require("axios");

module.exports = {
  name: "magik",
  description: "very distortion",
  run: async (client, message, args) => {
    const avatar = message.mentions.users.first().displayAvatarURL({ dynamic: false }) || message.author.displayAvatarURL({ dynamic: false }) 
    try {
      const { data } = await get(
        `https://nekobot.xyz/api/imagegen?type=magik&image=${avatar}&intensity=10`
      );
      message.reply(client.embed({ image: data.message }, message));
    } catch (err) {
      return console.error(err.message);
    }
  },
};
