const { Client, Message, MessageEmbed, splitMessage } = require("discord.js");
const { inspect } = require("util")
module.exports = {
  name: "eval",
  guildOnly: true,
  ownerOnly: true,
  category: `Developer`,
  description: `Evaluate a piece of code.`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const result = args.join(" ");
    try {
      const evaled = await eval(result);
      const split = splitMessage(inspect(evaled))[0]
      message.reply({embed: client.embed({title: "Eval Success!",description: `\`\`\`\n${split}\`\`\``},message)})
    } catch (err) {
      // message.reply({allowedMentions: {
      //   parse: ['everyone', 'users', 'roles'],
      //   repliedUser: false,
      //   }, embed: client.embed({ description: `AN ERROR HAS OCCURED: ${err}`}, message)})
      message.reply({
        embed: client.embed(
          { description: `AN ERROR HAS OCCURED: ${err}` },
          message
        ),
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
