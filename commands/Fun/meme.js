const { MessageEmbed } = require("discord.js");
const api = require("imageapi.js");
module.exports = {
  name: "meme",
  description: "sends a meme lmao",
  run: async (client, message, args) => {
    await api.advanced("meme", "top");
    message.channel.startTyping();
    const subreddits = ["dankmemes"];
    const advanced = await api.advanced(subreddits[Math.floor(Math.random() * subreddits.length)]);

        await message.channel.stopTyping();
        await message.reply({ embeds: [new MessageEmbed()
          .setTitle(`${advanced.title}`)
          .setURL(advanced.img)
          .setColor("RANDOM")
          .setImage(advanced.img)
          .setFooter(`by ${advanced.author} in ${subreddit}`)] });
  },
};
