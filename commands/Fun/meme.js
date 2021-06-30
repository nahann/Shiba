const { MessageEmbed } = require("discord.js");
const api = require("imageapi.js");
module.exports = {
  name: "meme",
  description: "sends a meme lmao",
  run: async (client, message, args) => {
    await api.advanced("meme", "top");
    message.channel.startTyping();
    let subreddits = ["dankmemes"];
    let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    console.log(subreddit);
    let advanced = await api.advanced(subreddit);
    const embed = new MessageEmbed()
      .setTitle(`${advanced.title}`)
      .setURL(advanced.img)
      .setColor("RANDOM")
      .setImage(advanced.img)
      .setFooter(`by ${advanced.author} in ${subreddit}`);

        await message.channel.stopTyping();
        await message.reply({ embeds: [embed] });
  },
};
