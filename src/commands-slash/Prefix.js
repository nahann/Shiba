const { MessageEmbed } = require("discord.js");
const GuildConfig = require("../database/GuildConfig");

module.exports = {
  name: "prefix",
  description: "change the guild prefix",
  options: [
    {
      name: "prefix",
      description: "change the guild prefix",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, command) => {
    command.defer();
    if (!command.member.permissions.has("MANAGE_GUILD"))
      return command.editReply({
        embeds: [
          new MessageEmbed()
            .setFooter(
              `${command.user.tag}`,
              command.user.displayAvatarURL({ dynamic: true, format: "png" })
            )
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(`You require the permission: \`MANAGE_GUILD\``),
        ],
      });
    const prefix = command.options.get("prefix").value;
    command.editReply({
      embeds: [
        new MessageEmbed()
          .setFooter(
            `${command.user.tag}`,
            command.user.displayAvatarURL({ dynamic: true, format: "png" })
          )
          .setTimestamp()
          .setColor("RANDOM")
          .setDescription(`Prefix updated to: \`${prefix}\``),
      ],
    });
    await GuildConfig.findOneAndUpdate(
      {
        guildId: command.guild.id,
      },
      { prefix: prefix }
    );
  },
};
