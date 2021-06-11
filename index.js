const Discord = require("discord.js");
const client = new Discord.Client({
  ws: { properties: { $browser: "Discord iOS" } },
  disableMentions: "everyone",
  intents: require("discord.js").Intents.ALL,
});

const config = require("./config.json");
const fs = require("fs");
const commandFolders = fs.readdirSync("./commands");
const GuildConfig = require("./database/GuildConfig");
const WelcomeConfig = require("./database/Welcome");
const UserinfoConfig = require("./database/Userinfo");
const mongoose = require("mongoose");
const voiceCollection = new Discord.Collection();
require('./Extend')

mongoose
  .connect(config.mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database.");
  });

client.commands = new Discord.Collection();

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.embed = (options, message) => {
  return new Discord.MessageEmbed({ ...options, color: "RANDOM" })
    .setFooter(
      `${message.author.tag}`,
      message.author.displayAvatarURL({ dynamic: true, format: "png" })
    )
    .setTimestamp();
  };

client.on("ready", () => {
  console.log(`${client.user.username} is now online.`);
})

client.on("message", async (message) => {
  if (message.author.bot) return;
  const data = await GuildConfig.findOne({ guildId: message.guild.id });
  if (!data)
    return message.reply({ embed:
      client.embed(
        {
          description: `If you are seeing this message it is because Shibu has not been able to add your server to the database.\nTo fix this issue kick, then re-add Shibu to your server.\nIf this issue keeps happening contact \`nahan#6480\``,
        },
        message
    )
      });
  const prefix = data.get("prefix");
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command)
    return message.reply({ embed:
      client.embed({ description: `Invalid Command.` }, message)
    });

  if (command.guildOnly && message.channel.type === "dm") {
    return message.channel.send(`This is a guild only command.`);
  }

  if (command.userPermissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.userPermissions)) {
      return message.channel.send({ embed: 
        client.embed(
          {
            description: `You require the permission: \`${command.userPermissions}\``,
          },
          message
        )
      });
    }
  }

  if (command.args && !args.length) {
    let reply = `❌ | Incorrect Usage`;

    if (command.usage) {
      reply += `\nCorrect Usage: \`${command.usage}\``;
    }

    return message.channel.send({ embed: client.embed({ description: reply }, message)});
  }

  if (command.ownerOnly && message.author.id !== "243845797643419658") return;

  try {
    command.run(client, message, args);
  } catch (error) {
    console.log(error);
    message.channel.send(`${error}`);
  }
});

client.on("guildCreate", async (guild) => {
  await GuildConfig.create({
    guildName: guild.name,
    guildId: guild.id,
  });
  console.log(`Shibu has joined ${guild.name}. Saved to base`);
});

client.on("guildDelete", async (guild) => {
  await GuildConfig.findOneAndDelete({ guildId: guild.id });
  console.log(`Shibu has left ${guild.name}. Deleted from base`);
  await WelcomeConfig.findOneAndDelete({ guildId: guild.id });
  console.log(`Welcome config deleted from base.`);
});

client.on("guildMemberAdd", async (member) => {
  const dataa = await WelcomeConfig.findOne({ guildId: member.guild.id });
  if (!dataa) return;
  if (dataa.toggled === false) return;
  const message = dataa.message;
  const newmsg = message
    .replace("{guild}", member.guild.name)
    .replace("{user}", `<@${member.user.id}>`);
  const channel = dataa.channelId;
  const channeltosend = member.guild.channels.cache.get(channel);
  const role = dataa.roleId;
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
  .setDescription(newmsg)
  .setFooter(`Shibu Welcome System`, client.user.displayAvatarURL())
  .setThumbnail(member.guild.iconURL())
  .setColor('RANDOM')
  try {
    channeltosend.send({ embed: embed })
    if (role) member.roles.add(role);
  } catch (err) {
    console.log(err);
  }
});

client.login(config.token);
