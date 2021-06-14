const { get } = require("axios");

module.exports = {
  name: "trumptweet",
  description: "make trump tweet text!",
  run: async (client, message, args) => {
    if (!args.length) return message.reply("you need some text there!");
    try {
      const { data } = await get(
        `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${args
          .slice(0)
          .join(" ")}`
      );
      message.reply(client.embed({ image: data.message }, message));
    } catch (err) {
      return console.error(err.message);
    }
  },
};
