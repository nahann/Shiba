const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "exec",
  description: `Executes a command for the user.`,
  ownerOnly: true,
  guildOnly: true,
  category: `Developer`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.users.first();
    const content = args.slice(1).join(" ");
    if(!user) return;
    if(!content) return;
    message.author = user;
    message.content = content;
    message.mentions.users.delete(message.mentions.users.first().id);
    await client.emit("message", message);
    message.react("🧃");
  },
};
