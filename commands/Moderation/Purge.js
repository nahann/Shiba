const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  aliases: ["clear"],
  guildOnly: true,
  args: true,
  usage: `*purge [number of messages]`,
  category: `Moderation`,
  userPermissions: 'MANAGE_MESSAGES',
  description: `Bulk deletes a maximum of 99 messages within a channel.`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await message.delete()
    const purge = args[0];
    if (isNaN(purge))
      return message.reply({ embeds:
        [client.embed({ description: `Provide a real number.` }, message)],
        allowedMentions: { repliedUser: false },
      })
    if (purge > 99)
      return message.reply({ embeds:
        [client.embed(
          { description: `You cannot delete more than 99 memssages` },
          message
      )],
      allowedMentions: { repliedUser: false },
    });
    message.channel.bulkDelete(purge);
    message.reply({
      embeds: [client.embed(
        { description: `${purge} messages have been deleted.` },
        message
      )],
      allowedMentions: { repliedUser: false },
    });
  },
};
