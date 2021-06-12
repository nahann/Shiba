const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const prefix = "*";

module.exports = {
  name: "help",
  category: `Info`,
  description: `Shows all the commands?`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try{
    const data = [];
    const { commands } = message.client;
    const embed = new MessageEmbed();
    const categories = new Collection();
    commands
      .forEach((command) => {
        const category = categories.get(command.category);
        if (category) {
          category.set(command.name, command);
        } else {
          categories.set(
            command.category,
            new Collection().set(command.name, command)
          );
        }
      });

    const dirEmojis = {
      Developer: "🍁",
      Fun: "🦢",
      "Guild Config": "🔧",
      Info: "📝",
      Moderation: "🦚",
      Userinfo: "🧦",
    };
    const lines = categories.map(
      (category, name) =>
        `${dirEmojis[name]} **${name}: **  ${category
          .map((command) => `\`${command.name}\``)
          .join(" ")}`
    );

    if (!args.length) {
      embed.setAuthor(`Shiba Command List`, message.author.displayAvatarURL());
      embed.setDescription(lines.join("\n"));
      embed.setThumbnail(client.user.displayAvatarURL());
      embed.setFooter(
        `You can send \`${prefix}help [command name]\` to get info on a specific command!`
      );
      embed.setColor("RANDOM");
      embed.addFields({
        name: `Notice: For a chance to recieve premium perks for Shiba vote on top.gg, then send proof in the support server.`,
        value: `**[Vote](https://top.gg/) | [Invite](https://discord.com/api/oauth2/authorize?client_id=838254815225970739&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=bot%20applications.commands) | [Support](https://discord.gg/dpspC6JvUZ)**`,
      });
      return message.reply({ embed: embed,
        allowedMentions: { repliedUser: false }, });
    }
    const embed2 = new MessageEmbed();
    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);
    // const oldpemrs = `${command.userPermissions.slice(0, 1).toUpperCase() + command.userPermissions.substring(1).toLowerCase()}`
    // const newpemrs = oldpemrs.replace("_", " ")
    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Usage:** ${command.usage}`);
    if (command.userPermissions)
      data.push(`**Permissions:** ${command.userPermissions}`);
    if (command.guildOnly) data.push(`**Guild Only:** ${command.guildOnly}`);
    if (command.ownerOnly) data.push(`**Owner Only:** ${command.guildOnly}`);

    embed2.setAuthor(`Shiba Help Menu`);
    embed2.setDescription(data.join("\n"));
    embed2
      .setFooter(`Syntax: [] = required, {} = optional.`)
      .setColor("RANDOM");
    const cmdperms = command.userPermissions.slice(1).toLowerCase();
    message.reply({ embed: embed2,
      allowedMentions: { repliedUser: false }, });
   }catch(e){
    message.reply({embed: client.embed({title: "Error Caught!",description: e},message)})
   }
  },
};
