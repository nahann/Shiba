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
          name: `Tag <:tag:854460951805296640>`,
          value: `\`\`\`${client.user.tag}\`\`\``,
        },
        {
          name: `Ping <:ping:854461197720748032>`,
          value: `\`\`\`${ms(client.ws.ping)}\`\`\``,
        },
        {
          name: `Uptime <:uptime:854464688490020875>`,
          value: `\`\`\`${ms(client.uptime)}‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎\`\`\``,
        },
        {
          name: `Users <:users:854458687547899934>`,
          value: `\`\`\`${client.users.cache.size}\`\`\``,
        },
        {
          name: `Channels <:channel:854458888131444776>,
          value: `\`\`\`${client.channels.cache.size}\`\`\``,
        },
        {
          name: `Guilds <:guilds:854459430733479967>,
          value: `\`\`\`${client.guilds.cache.size}\`\`\``,
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
      embeds: [embed],
      components: [buttons],
      allowedMentions: { repliedUser: false },
    });
  },
};
