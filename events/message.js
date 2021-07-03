const ms = require("ms"),
      UserConfig = require("./../database/UserConfig"),
      { mongouri } = require("../config.json"),
      Levels = require("discord-xp");
Levels.setURL(mongouri);

module.exports = {
  name: "message",
  run: async (message, client) => {
    //Leveling shit
    client.Levels = Levels;
    const levelon = await (
      await client.db.load("levelguilds")
    ).findOne({ guild: message.guild.id });

    if (message.channel.id == "852783453606248468" && !message.content.startsWith("*")) message.crosspost();
    const doc = await (
      await client.db.load("blacklist")
    ).findOne({ user: message.author.id });

    const GuildConfig = require("../database/GuildConfig");
    const CC = require("../database/CustomCommands");

    if (message.author.bot) return;
    if (levelon?.onoff) {
      const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
      const hasLeveledUp = await client.Levels.appendXp(
        message.author.id,
        message.guild.id,
        randomAmountOfXp
      );
      if (hasLeveledUp) {
        const user = await client.Levels.fetch(
          message.author.id,
          message.guild.id
        );
        message.reply(
          `Congratulations! You have leveled up to **${user.level}**. <:tada:856552964713087027>`
        );
      }
    }
    const data =
      (await GuildConfig.findOne({ guildId: message.guild.id })) ||
      (await GuildConfig.create({
        guildName: message.guild.name,
        guildId: message.guild.id,
      }));
    //Get the custom prefix of a server or use the defaukt prefix
    const prefix = data.get("prefix");
    message.embed = function(embed){
       return message["reply"]({ embeds: [client.embed(embed,message)] })    
    }
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
      //Check if there is a custom command or not
      CC.findOne(
        { guildId: message.guild.id, commandname: commandName },
        (e, cc) => {
          if (!cc) return;
          if (e) return console.error(e);
          if (commandName === cc.commandname) {
            return message.reply(cc.commandcontent);
          }
        }
      );
      const aliases = [];
      client.commands.forEach((cmm) =>
        cmm.aliases?.forEach((alias) => aliases.push(alias))
      );
      const best = [...client.commands.map((c) => c.name), ...aliases].filter(
        (c) =>
          require("leven")(commandName.toLowerCase(), c.toLowerCase()) <
          c.length * 0.4
      );
      const d = !best.length
        ? ""
        : best.length == 1
        ? `Did you mean **${best[0]}**?`
        : `Did you mean any of these? ${best
            .slice(0, 3)
            .map((val) => `**${val}**`)
            .join("\n")}`;
      if (d.length)
        return message.reply({
          embeds: [
            client.embed(
              { description: "Couldn't find that command!\n" + d },
              message
            ),
          ],
        });
    }
    if (!command) return;
    //Command log
    client.guilds.cache.find(g => g.name == "Shiba Support")
      .channels.cache.get("860179405824983090")
         .send({
           embeds: [ client.embed({title: "Command executed", description: `Guild: ${message.guild.name}\nCommand: ${command.name}\nUser: ${message.author.id}`},message) ]
              })
    //For the error event
    client.cmdmsg = message
    if (doc)
      return message.reply({
        embeds: [
          client.embed({ description: "You're blacklisted lmao" }, message),
        ],
      });
    //Obviusly checking for cooldowns
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
        "705843647287132200",
      ].includes(message.author.id)
    )
      return;

    try {
      await command.run(client, message, args);
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
      client.emit("error",error)
    }
  },
};
