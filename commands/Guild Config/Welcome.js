const { Client, Message, MessageEmbed } = require("discord.js");
const WelcomeConfig = require("../../database/Welcome");

module.exports = {
  name: "welcome",
  guildOnly: true,
  userPermissions: ["MANAGE_GUILD"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0])
      return message.lineReplyNoMention(
        client.embed(
          {
            author: {
              name: "Welcome System Sub-Commands",
              icon_url: client.user.displayAvatarURL(),
            },
            fields: [
              {
                name: "set-channel",
                value: "Set the channel for users to be welcomes in.",
              },
              {
                name: "set-role",
                value: "Sets the role the user will recieve when they join.",
              },
              {
                name: "set-message",
                value:
                  "Sets the message the user with be welcomed with. Use {guild} to say the guild name and {user} to mention the user joining. `EX: *welcome message Welcome {user} to {guild}`",
              },
              {
                name: "enable",
                value: "Enables the welcome system.",
                inline: true,
              },
              {
                name: "disable",
                value: "Disables the welcome system.",
                inline: true,
              },
            ],
          },
          message
        )
      );
    if (args[0].toLowerCase() === "set-channel") {
      const channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.has(args[1]);
      if (!channel)
        message.lineReplyNoMention(
          client.embed({ description: `Invalid Channel` }, message)
        );
      await WelcomeConfig.create({
        guildId: message.guild.id,
        channelId: channel.id,
      });
      message.lineReplyNoMention(
        client.embed(
          { description: `Channel set to <#${channel.id}>` },
          message
        )
      );
    }
    if (args[0].toLowerCase() === "set-role") {
      const role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.has(args[1]);
      if (!role)
        message.lineReplyNoMention(
          client.embed({ description: `Invalid Channel` }, message)
        );
      await WelcomeConfig.findOneAndUpdate(
        { guildId: message.guild.id },
        { roleId: role.id }
      );
      message.lineReplyNoMention(
        client.embed({ description: `Role set to: <@&${role.id}>` }, message)
      );
    }
    if (args[0].toLowerCase() === "set-message") {
      const msg = args.slice(1).join(" ");
      if (!msg)
        return message.lineReplyNoMention(
          client.embed(
            {
              description: `Provide a welcome message.\nDon't forget you can use {guild} to use the guild name.\nYou can also use {user} to mention the user that is joining.`,
            },
            message
          )
        );
      await WelcomeConfig.findOneAndUpdate(
        { guildId: message.guild.id },
        { message: msg }
      );
      message.lineReplyNoMention(
        client.embed(
          { description: `Welcome message set to: \`${msg}\`` },
          message
        )
      );
    }
    if (args[0].toLowerCase() === "enable") {
      await WelcomeConfig.findOneAndUpdate(
        { guildId: message.guild.id },
        { toggled: true }
      );
      message.lineReplyNoMention(
        client.embed({ description: `Welcome system enabled` }, message)
      );
    }
    if (args[0].toLowerCase() === "disable") {
      await WelcomeConfig.findOneAndUpdate(
        { guildId: message.guild.id },
        { toggled: false }
      );
      message.lineReplyNoMention(
        client.embed({ description: `Welcome system disabled` }, message)
      );
    }
  },
};
