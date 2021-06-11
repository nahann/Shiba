const { Client, Message, MessageEmbed } = require("discord.js");
const GuildConfig = require("../../database/GuildConfig");

module.exports = {
  name: "prefix",
  guildOnly: true,
  args: true,
  usage: "*prefix [prefix]",
  userPermissions: ["MANAGE_GUILD"],
  category: `Guild Config`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const prefix = args.join(" ");
    await GuildConfig.findOneAndUpdate(
      { guildId: message.guild.id },
      { prefix: prefix }
    );
    message.reply({allowedMentions: {    
      parse: ['everyone', 'users', 'roles'],    
      repliedUser: false,
      }, embed: client.embed({ description: `Prefix updated to: \`${prefix}\``}, message)})
  },
};
