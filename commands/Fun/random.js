const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "random",
  description: "randomizes the given arguments",
  aliases: ["randomword", "rw"],
  run: async(client, message, args) => {
    if (!args.length) return message.reply("you need some text there!");
    const m = args.length > 1 ? args[Math.floor(Math.random() * args.length)] : args[0].split("")[Math.floor(Math.random * args[0].split("").length)]
    const e = new MessageEmbed()
      .setTitle("Randomizinator 2000")
      .setDescription(m)
      .setColor("RANDOM")
    message.channel.send({ embeds: [e] });
  },
};
