const Discord = require("discord.js");
const client = new Discord.Client({
  ws: { properties: { $browser: "Discord iOS" } },
  disableMentions: "everyone",
});

const config = require("./config.json");
const fs = require("fs");
const commandFolders = fs.readdirSync("./commands");
const GuildConfig = require("./databse/GuildConfig");
const WelcomeConfig = require("./databse/Welcome");
const mongoose = require("mongoose");
require("discord-reply");

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
});

client.on("message", async (message) => {
  await GuildConfig.findOne({ guildId: message.guild.id });
  if (!data)
    await GuildConfig.create({
      guildName: message.guild.name,
      guildId: message.guild.id,
    });
  const prefix = data.get("prefix");
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command)
    return message.lineReplyNoMention(
      client.embed({ description: `Invalid Command.` }, message)
    );

  if (command.guildOnly && message.channel.type === "dm") {
    return message.channel.send(`This is a guild only command.`);
  }

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.channel.send(
        client.embed(
          {
            description: `You require the permission: \`${command.permissions}\``,
          },
          message
        )
      );
    }
  }

  if (command.args && !args.length) {
    let reply = `❌ | Incorrect Usage`;

    if (command.usage) {
      reply += `\nCorrect Usage: \`${command.usage}\``;
    }

    return message.channel.send(client.embed({ description: reply }, message));
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
  console.log(`Shibu has joined ${guild.name}. Saved to databse`);
});

client.on("guildDelete", async (guild) => {
  await GuildConfig.findOneAndDelete({ guildId: guild.id });
  console.log(`Shibu has left ${guild.name}. Deleted from databse`);
  await WelcomeConfig.findOneAndDelete({ guildId: guild.id });
  console.log(`Welcome config deleted from databse.`);
});

client.on("guildMemberAdd", async (member) => {
  const data = await WelcomeConfig.findOne({ guildId: member.guild.id });
  if (data.toggled === false) return;
  const message = data.message;
  const newmsg = message
    .replace("{guild}", member.guild.name)
    .replace("{user}", `<@${member.user.id}>`);
  const channel = data.channelId;
  const channeltosend = member.guild.channels.cache.get(channel);
  const role = data.roleId;
  try {
    channeltosend.send(newmsg);
    if (role) member.roles.add(role);
  } catch (err) {
    console.log(err);
  }
});

client.login(config.token);
