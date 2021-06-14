const { get } = require("axios");

module.exports = {
  name: "deepfry",
  description: "😁😀🤣🔥",
  run: async (bot, message, args) => {
    const avatar = message.mentions.users.first().displayAvatarURL({ dynamic: false }) || message.author.displayAvatarURL({ dynamic: false }) 
    try {
      const { data } = await get(
        `https://nekobot.xyz/api/imagegen?type=deepfry&url=${avatar}`
      );
      message.reply(client.embed({ image: data.message }, message));
    } catch (err) {
      return console.error(err.message);
    }
  },
};
