const { Client, Message, MessageEmbed } = require("discord.js");
const GuildConfig = require("../../database/GuildConfig");
const CCconfig = require("../../database/CustomCommands");

module.exports = {
  name: "cc",
  guildOnly: true,
  args: true,
  usage: "*cc [commandname] [whats in the command]",
  userPermissions: ["MANAGE_GUILD"],
  category: `Guild Config`,
  description: `add a custom command to your guild!`,
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
        `:x: incorrect usage: proper usage: \`${prefix}cc commandname command content\``
      );
    if (!args.slice(1).join(" "))
      return message.reply(
        `:x: incorrect usage: proper usage: \`${prefix}cc commandname command content\``
      );
    const ccname = args[0];
    const cccontent = args.slice(1).join(" ");
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
      const newschema = new CCconfig({
        guildId: message.guild.id,
        commandcontent: cccontent,
        commandname: ccname,
      });
      newschema.save();
      message.reply({ embeds: [client.embed({ description: `Command: \`${ccname}\` With content: \`${cccontent}\` has been created!`}, message)]})
    } catch (err) {
      console.error(err);
      message.reply({ embeds: [client.embed({ description: `An error has occured.`}, message)]})
    }
  },
};
