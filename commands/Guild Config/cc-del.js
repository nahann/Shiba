const { Client, Message, MessageEmbed } = require("discord.js");
const GuildConfig = require("../../database/GuildConfig");
const CCconfig = require("../../database/CustomCommands");

module.exports = {
  name: "cc-del",
  guildOnly: true,
  args: true,
  usage: "*cc-del [commandname]",
   userPermissions: ["MANAGE_GUILD"],
  category: `Guild Config`,
  description: `delete a custom command!`,
  userPermissions: `MANAGE_GUILD`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const prefix = GuildConfig.findOne({ guildId: message.guild.id }).prefix;
    if (!args[0])
      return message.reply(
        `:x: incorrect usage: proper usage: \`${prefix}cc-del commandname\``
      );
    const ccname = args[0];
    try {
      const thing = CCconfig.findOne({ guildId: message.guild.id });
      if (thing.name === ccname) {
        CCconfig.findOneAndUpdate(
          { guildId: message.guild.id, commandname: ccname },
          {
            guildId: message.guild.id,
            commandname: ccname,
            commandcontent: cccontent,
          }
        );
      }
      CCconfig.findOneAndDelete({ guildId: message.guild.id, commandname: args[0] }, (e, doc) => {
        if(e) return  message.reply({ embed: client.embed({ description: `An error has occured.`}, message)})
        else return  message.reply({ embed: client.embed({ description: `Command: ${ccname} has been deleted.`}, message)})
      })
    } catch (err) {
      console.error(err);
      message.reply({ embed: client.embed({ description: `An error has occured.`}, message)})
    }
  },
};
