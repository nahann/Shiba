const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const prefix = '*'

module.exports = {
    name: 'help',
    category: `Info`,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const data = [];
      const { commands } = message.client;
      const embed = new MessageEmbed()
      const categories = new Collection()
      commands.filter((cmd) => cmd.category !== 'developer').forEach((command) => {
        const category = categories.get(command.category)
        if(category) {
          category.set(command.name, command)
        } else {
          categories.set(command.category, new Collection().set(command.name, command))
        }
      })
      const lines = categories.map(
        (category, name) =>
          `${name}: ${category
            .map((command) => `\`${command.name}\``)
            .join(", ")}`
      );
      if(!args.length) {
        embed.setAuthor(`Shibu Help Menu`)
        embed.setDescription(lines.join("\n"))
        embed.setThumbnail(client.user.displayAvatarURL())
        embed.setFooter(`You can send \`${prefix}help [command name]\` to get info on a specific command!`)
        .setColor('RANDOM')
        return message.channel.send({ embed: embed })
    }
    const embed2 = new MessageEmbed()
    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** ${command.usage}`);
    if(command.userPermissions)
      data.push(`**Permissions:** ${command.userPermissions}`)
      if(command.guildOnly)
      data.push(`**Guild Only:** ${command.guildOnly}`)

      embed2.setAuthor(`Shibu Help Menu`)
      embed2.setDescription(data.join("\n"))
      embed2.setThumbnail(client.user.displayAvatarURL())
      embed2.setFooter(`Syntax: [] = required, {} = optional.`)
      .setColor('RANDOM')

    message.channel.send({ embed: embed2   });
    }
}

