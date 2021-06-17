const ms = require("ms");
const UserConfig = require("./../database/UserConfig");

module.exports = {
  name: "message",
  run: async (message, client) => {
    const GuildConfig = require("../database/GuildConfig");
    const CC = require("../database/CustomCommands");
    if (message.author.bot) return;
    const data =
      (await GuildConfig.findOne({ guildId: message.guild.id })) ||
      (await GuildConfig.create({
        guildName: message.guild.name,
        guildId: message.guild.id,
      }));
    const prefix = data.get("prefix");
    if (!data)
      return message.reply({
        embeds: [
          client.embed(
            {
              description: `If you are seeing this message it is because Shiba has not been able to add your server to the database.\nTo fix this issue kick, then re-add Shiba to your server.\nIf this issue keeps happening contact \`nahan#6480\``,
            },
            message
          ),
        ],
      });
    if (!message.content.startsWith(prefix)) return;
    let [commandName, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    commandName = commandName.toLowerCase();
    args.clean = message.cleanContent.slice(prefix.length + commandName.length);
    const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases?.includes(commandName));

    if (!command) {
      console.log("test")
      CC.findOne(
        { guildId: message.guild.id, commandname: commandName },
        (e, cc) => {
          if (e) return console.error(e);
          if (commandName === cc.commandname) {
            return message.reply(cc.commandcontent);
          }
        }
      );    
       const aliases = []; client.commands.forEach(cmm => cmm.aliases?.forEach(alias => aliases.push(alias)))
       const best = [...client.commands.map(c => c.name),...aliases].filter(c => require("leven")(commandName.toLowerCase(),c.toLowerCase()) < (c.length * 0.4))
       const d = !best.length ? "" : best.length == 1 ? `Did you mean **${best[0]}**?` : `Did you mean any of these? ${best.slice(0,3).map(val => `**${val}**`).join("\n")}` 
       return message.reply({embeds: [client.embed({description: "Couldn't find that command!\n" + d},message)]})
    }
    if (!command) return;
    if (client.cooldowns.has(`${message.author.id}-${command.name}`)) {
      return message.reply({
        embeds: [
          client.embed(
            {
              description: `Try this command in ${ms(
                client.cooldowns.get(`${message.author.id}-${command.name}`) -
                  Date.now(),
                { long: true }
              )}`,
            },
            message
          ),
        ],
      });
    }

    if (command.guildOnly && message.channel.type === "dm") {
      return message.channel.send(`This is a guild only command.`);
    }

    if (command.beta) {
      const data = await UserConfig.findOne({ userId: message.author.id });
      if (!data)
        return message.reply({
          embeds: [
            client.embed(
              { description: `This is currently a beta feature` },
              message
            ),
          ],
        });
    }

    if (command.userPermissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !authorPerms.has(command.userPermissions)) {
        return message.channel.send({
          embeds: [
            client.embed(
              {
                description: `You require the permission: \`${command.userPermissions}\``,
              },
              message
            ),
          ],
        });
      }
    }

    if (command.args && !args.length) {
      let reply = `❌ | Incorrect Usage`;

      if (command.usage) {
        reply += `\nCorrect Usage: \`${command.usage}\``;
      }

      return message.channel.send({
        embeds: [client.embed({ description: reply }, message)],
      });
    }

    if (
      command.ownerOnly &&
      ![
        "243845797643419658",
        "520797108257816586",
        "447680195604774922",
      ].includes(message.author.id)
    )
      return;

    try {
      command.run(client, message, args);
      if (command.cooldown) {
        client.cooldowns.set(
          `${message.author.id}-${command.name}`,
          Date.now() + command.cooldown
        );
        setTimeout(() => {
          client.cooldowns.delete(`${message.author.id}-${command.name}`);
        }, command.cooldown);
      }

      if (!command.cooldown) {
        client.cooldowns.set(
          `${message.author.id}-${command.name}`,
          Date.now() + 3000
        );
        setTimeout(() => {
          client.cooldowns.delete(`${message.author.id}-${command.name}`);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      message.channel.send(`${error}`);
    }
  },
};
