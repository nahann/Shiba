const Discord = require("discord.js"),
client = new Discord.Client({
  ws: { properties: { $browser: "Discord iOS" } },
  intents: require("discord.js").Intents.ALL,
  allowedMentions: {
    repliedUser: false,
    parse: ["users","roles"]
  },
}),
config = require("./config.json"),
fs = require("fs"),
GuildConfig = require("./database/GuildConfig"),
WelcomeConfig = require("./database/Welcome"),
UserinfoConfig = require("./database/Userinfo"),
mongoose = require("mongoose"),
ms = require('ms'),
{ Database } = require('zapmongo')

mongoose
  .connect(config.mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database.");
  });

  client.db = new Database({ mongoURI: config.mongouri, schemas: [
    {
        name: 'userEcos',
        data: {
            userId: String,
            shibaToken: {
              type: Number,
              default: 500,
            },
            Passive: {
              type: Boolean,
              default: false
            }
        }
    }
] });
client.cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
client.loadCommands = function(){
const commandFolders = fs.readdirSync(`${__dirname}/commands`)
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    if(!command.category)command.category = folder
    client.commands.set(command.name, command);
  }
}
}
client.loadEvents = function(){
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.run(...args,client));
	} else {
		client.on(event.name, (...args) => event.run(...args,client));
	}
}
}
client.loadEvents()
client.loadCommands()
client.embed = (options, message) => {
  return new Discord.MessageEmbed({ ...options, color: "RANDOM" })
    .setFooter(
      `${message.author.tag}`,
      message.author.displayAvatarURL({ dynamic: true, format: "png" })
    )
    .setTimestamp();
};
client.on("message", async (message) => {
  if (message.author.bot) return;
  const data = await GuildConfig.findOne({ guildId: message.guild.id });
  if (!data)
    return message.reply({
      embed: client.embed(
        {
          description: `If you are seeing this message it is because Shiba has not been able to add your server to the database.\nTo fix this issue kick, then re-add Shiba to your server.\nIf this issue keeps happening contact \`nahan#6480\``,
        },
        message
      ),
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

  if (!command) return;

  if(client.cooldowns.has(`${message.author.id}-${command.name}`)) {
    return message.reply({ embed: client.embed({ description: `Try this command in ${ms(client.cooldowns.get(`${message.author.id}-${command.name}`) - Date.now(), { long: true })}`}, message)})
  }



  if (command.guildOnly && message.channel.type === "dm") {
    return message.channel.send(`This is a guild only command.`);
  }

  if (command.beta) {
    const betaTesters = ["243845797643419658", "520797108257816586", "427181678704984064"]
    if(!betaTesters.includes(message.author.id)) return message.reply({ embed: client.embed({ description: `This is currently a beta feature`}, message)})
  }

  if (command.userPermissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.userPermissions)) {
      return message.channel.send({
        embed: client.embed(
          {
            description: `You require the permission: \`${command.userPermissions}\``,
          },
          message
        ),
      });
    }
  }

  if (command.args && !args.length) {
    let reply = `❌ | Incorrect Usage`;

    if (command.usage) {
      reply += `\nCorrect Usage: \`${command.usage}\``;
    }

    return message.channel.send({
      embed: client.embed({ description: reply }, message),
    });
  }

  if (command.ownerOnly && !["243845797643419658","520797108257816586"].includes(message.author.id)) return;

  try {
    command.run(client, message, args);
    if(command.cooldown) {
      client.cooldowns.set(`${message.author.id}-${command.name}`, Date.now() + command.cooldown)
      setTimeout(() => {
        client.cooldowns.delete(`${message.author.id}-${command.name}`)
      }, command.cooldown)
    }

    if(!command.cooldown) {
      client.cooldowns.set(`${message.author.id}-${command.name}`, Date.now() + 3000)
      setTimeout(() => {
        client.cooldowns.delete(`${message.author.id}-${command.name}`)
      }, 3000)
    }
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
  console.log(`Shiba has joined ${guild.name}. Saved to base`);
});

client.on("guildDelete", async (guild) => {
  await GuildConfig.findOneAndDelete({ guildId: guild.id });
  console.log(`Shiba has left ${guild.name}. Deleted from base`);
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
    .setFooter(`Shiba Welcome System`, client.user.displayAvatarURL())
    .setThumbnail(member.guild.iconURL())
    .setColor("RANDOM")
    .setTimestamp();
  try {
    channeltosend.send({ embed: embed });
    if (role) member.roles.add(role);
  } catch (err) {
    console.log(err);
  }
});

client.login(config.token);
