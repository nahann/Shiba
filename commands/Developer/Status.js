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
   const status = stype[0].replace("{guilds.size}", client.guilds.cache.size)
   const types={
     "PLAYING": "Playing",
     "WATCHING": "Watching",
     "STREAMING": "Streaming",
     "LISTENING": "Listening to",
     "COMPETING": "Competing at"
   }
   const typ = stype[1] ? stype[1] : "PLAYING"
   console.log(typ)
   if(!["WATCHING","PLAYING","STREAMING","LISTENING","COMPETING"].includes(typ.toUpperCase())) return message.reply("That's not a valid type ya nerd")
   await client.user.setActivity(status,{type: typ.toUpperCase()})
   message.reply({embeds: [client.embed({description: `Changed status to ${types[typ.toUpperCase()]} ${status}`},message)]})
  },
};
