const { Client, Message, Util } = require("discord.js");
module.exports = {
  name: "steal-emoji",
  userPermissions: "MANAGE_EMOJIS",
  args: true,
  guildOnly: true,
  category: `Moderation`,
  description: `Steal an emoji.`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    emojisarr = [];
    for (const rawemoji of args) {
      const parsed = Util.parseEmoji(rawemoji);
      if (parsed.id) {
        const extention = parsed.animated ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/emojis/${
          parsed.id + extention
        }`;
        const emoji = await message.guild.emojis.create(url, parsed.name);
        emojisarr.push(emoji);
      }
    }
    message.channel.send(`added emoji(s): ${emojisarr.join(", ")}`);
  }, 
};
