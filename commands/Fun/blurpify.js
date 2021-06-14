const { get } = require("axios");

module.exports = {
  name: "blurpify",
  description: "b l u r p u l",
  run: async (client, message, args) => {
    const user = message.mentions.users.first()|| message.author;
    const avatar = user.displayAvatarURL()
    try {
      const { data } = await get(
        `https://nekobot.xyz/api/imagegen?type=blurpify&url=${avatar}`
      );
      message.reply({ embed: client.embed({ image: data.message }, message)});
    } catch (err) {
      return console.error(err);
    }
  },
};
