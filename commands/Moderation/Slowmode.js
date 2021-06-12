const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "slowmode", 
  guildOnly: true,
  userPermissions: 'MANAGE_MESSAGES'
  args: true,
  usage: `*slowmode [number in seconds]`,
  category: `Moderation`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await message.delete()
    const slowmode  = args[0];
    if (isNaN(slowmode))
      return message.reply({ embed:
        client.embed({ description: `Provide a real number.` }, message),
        allowedMentions: { repliedUser: false },
      })
    message.channel.setRateLimitPerUser(slowmode)
    message.reply({
      embed: client.embed(
        { description: `Slowmode set to ${slowmode}` },
        message
      ),
      allowedMentions: { repliedUser: false },
    });
  },
};
