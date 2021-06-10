const { Client, Message, MessageEmbed } = require("discord.js");
const GuildConfig = require("../../databse/GuildConfig");

module.exports = {
  name: "prefix",
  guildOnly: true,
  args: true,
  usage: "*prefix [prefix]",
  permissions: ["MANAGE_GUILD"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const prefix = args.length();
    await GuildConfig.findOneAndUpdate(
      { guildId: message.guild.id },
      { prefix: prefix }
    );
    message.lineReplyNoMention(
      client.embed({ description: `Prefix updated to: \`${prefix}\`` }, message)
    );
  },
};
