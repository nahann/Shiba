const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "bot-info",
  aliases: ["botinfo"],
  category: `Info`,
  description: `Get info on the bot.`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setAuthor(`Shiba Bot Info`, client.user.displayAvatarURL())
      .setDescription(
        `**[Support Server](https://discord.gg/kxt4GsrEE6)**`
      )
      .addFields(
        {
          name: `Tag`,
          value: `\`\`\`${client.user.tag}\`\`\``,
          inline: true,
        },
        {
          name: `Ping`,
          value: `\`\`\`${ms(client.ws.ping)}\`\`\``,
          inline: true,
        },
        {
          name: `Uptime`,
          value: `\`\`\`${ms(client.uptime)}\`\`\``,
          inline: true,
        },
        {
          name: `Users`,
          value: `\`\`\`${client.users.cache.size}\`\`\``,
          inline: true,
        },
        {
          name: `Channels`,
          value: `\`\`\`${client.channels.cache.size}\`\`\``,
          inline: true,
        },
        {
          name: `Guilds`,
          value: `\`\`\`${client.guilds.cache.size}\`\`\``,
          inline: true,
        }
      )
      .setColor("RANDOM")
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp();
    message.reply({
      embed: embed,
      allowedMentions: { repliedUser: false },
    });
  },
};
