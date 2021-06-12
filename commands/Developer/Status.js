const { Client, Message, MessageEmbed, splitMessage } = require("discord.js")
module.exports = {
  name: "status",
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
   const stype = args.join(" ").split(" --type=")
   const status = stype[0]
   stype[1] == stype[1] || "PLAYING"
   if(!["WATCHING","PLAYING"].includes(stype[1].toUpperCase())) return message.reply("That's not a valid type ya nerd")
   client.user.setActivity(status,{type: stype[1].toUpperCase()})
  },
};
