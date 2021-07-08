const { Client, Message, MessageEmbed, Util, MessageButton, MessageActionRow } = require("discord.js");
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
      const spl = inspect(evaled, { depth: 0 }).splitEvery(3000)
      const split = spl.shift()
      const obj = {
        embeds: [
          client.embed(
            { title: "Eval Success!", description: `\`\`\`\n${split}\`\`\`` },
            message
          ),
        ],
      }
      if(spl.length){
        const newspl = spl.slice(0,4)
        newspl.map(result =>{
         obj.embeds.push(client.embed({ description: `\`\`\`\n${result}\`\`\``},message))
        })
      }
      console.log(obj.embeds)
      message.reply(obj);
     
    } catch (err) {
      client.emit("error",err)
    }
  },
};
