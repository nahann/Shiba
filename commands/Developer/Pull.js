const { Client, Message, MessageEmbed } = require("discord.js");
const { exec } = require("child_process");

module.exports = {
  name: "force-pull",
  description: `Pulles from the github repo.`,
  ownerOnly: true,
  guildOnly: true,
  category: `Developer`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await message.reply({
      embeds: [client.embed({ description: `Pulled Successfully` }, message)],
    });
    exec("cd /root/Shiba && git stash && git pull && pm2 restart 0",(res,error)=>{
      message.reply({
      embeds: [client.embed({title: "Output",description: `${res || error}`},message)]
      })
    });
  },
};
