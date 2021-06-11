const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  userPermissions: "BAN_MEMBERS",
  args: true,
  guildOnly: true,
  usage: "*unban [user id]",
  category: `Moderation`,
  description: `Unbans a member from the guild.`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.reply(
        client.embed(
          {
            description: `Shiba does not have the \`BAN_MEMBERS\` permission.`,
          },
          message
        )
      );
    try {
      await message.guild.members.unban(args[0]);
      message.reply({allowedMentions: {    
        parse: ['everyone', 'users', 'roles'],    
        repliedUser: false,
        }, embed: client.embed({ description: `User has been unbanned`}, message)})
    } catch (err) {
      message.reply({allowedMentions: {    
        parse: ['everyone', 'users', 'roles'],    
        repliedUser: false,
        }, embed: client.embed({ description: `An error has occured` + err}, message)})
    }
  },
};
