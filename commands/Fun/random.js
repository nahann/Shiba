const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "random",
  description: "randomizes the given arguments",
  aliases: ["randomword", "rw"],
  run: async(client, message, args) => {
    if (!args.length) return message.reply("you need some text there!");
    const m = args[Math.floor(Math.random() * args.length)];
    const e = new MessageEmbed()
      .setTitle("Randomizinator 2000")
      .setDescription(m)
      .setFooter("quak");
    message.channel.send({ embed: e });
  },
};
