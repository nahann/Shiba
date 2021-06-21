const { Client, Message, MessageEmbed, splitMessage } = require("discord.js");
const { inspect } = require("util");
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
    const reg = new RegExp("client.token", "g");
    const result = args
      .join(" ")
      .replace(/”/g, '"')
      .replace(/“/g, '"')
      .replace(reg, "you thought");
    try {
      const evaled = await eval(result);
<<<<<<< HEAD
      const split = splitMessage(inspect(evaled, { depth: 1 }))[0];
=======
      const split = splitMessage(inspect(evaled,{depth: 0}))[0];
>>>>>>> c0eaba470e2ea027f806c4d2ee67142bb64eb0c8
      message.reply({
        embeds: [
          client.embed(
            { title: "Eval Success!", description: `\`\`\`\n${split}\`\`\`` },
            message
          ),
        ],
      });
    } catch (err) {
      message.reply({
        embeds: [
          client.embed(
            { description: `AN ERROR HAS OCCURED: ${err}` },
            message
          ),
        ],
      });
    }
  },
};
