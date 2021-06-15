const { MessageEmbed } = require("discord.js");
const api = require("imageapi.js");
module.exports = {
  name: "meme",
  description: "sends a meme lmao",
  run: async(client, message, args)  => {
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

    message.channel
      .createWebhook(`${message.author.username}\'s meme `, {
        avatar:
          "https://ih1.redbubble.net/image.772966036.8977/flat,750x,075,f-pad,750x1000,f8f8f8.u5.jpg",
      })
      .then(async (web) => {
        await message.channel.stopTyping();
        await web.send({ embeds: [embed] });
        web.delete();
      });
  },
};
