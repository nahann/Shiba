const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "botinfo",
  description: "Basic info on Shiba",
  run: async (client, command) => {
    command.defer();
    const embed = new MessageEmbed()
      .setAuthor(`Shiba Bot Info`, client.user.displayAvatarURL())
      .setDescription(
        `[Support Server](https://discord.gg/kxt4GsrEE6)   [Vote For Shiba](https://top.gg/)`
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
      .setFooter(command.user.tag, command.user.displayAvatarURL())
      .setTimestamp();
    command.editReply({ embeds: [embed] });
  },
};
