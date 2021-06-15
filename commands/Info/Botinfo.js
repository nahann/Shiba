const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "bot-info",
  aliases: ["botinfo", "info", "shiba"],
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

      
    const buttons = new MessageActionRow()
        .addComponents(
	   new MessageButton()
           .setLabel('Invite')
           .setURL('https://discord.com/oauth2/authorize?client_id=838254815225970739&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=bot%20applications.commands')
           .setStyle('LINK'),

	   new MessageButton()
            .setLabel('Support')
            .setURL('https://discord.gg/K4cMecMQyp')
            .setStyle('LINK'),
	);

    message.reply({
      embed: embed,
      components: [buttons],
      allowedMentions: { repliedUser: false },
    });
  },
};
