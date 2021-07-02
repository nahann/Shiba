const { Client, MessageEmbed, Collection} = require("discord.js")
const { Database } = require("zapmongo")
const fs= require("fs")
const Spotify = require("erela.js-spotify")
const { Manager } = require("erela.js")
const config = require("./config.json")
class ShibaClient extends Client{
  constructor(options){
    super(options)
    this.db = new Database({
  mongoURI: config.mongouri,
  schemas: [
    {
      name: "userEcos",
      data: {
        userId: String,
        walletShibaToken: {
          type: Number,
          default: 500,
        },
        bankShibaToken: {
          type: Number,
          default: 0,
        },
        Passive: {
          type: Boolean,
          default: false,
        },
      },
    },
    {
      name: "warns",
      data: {
        warns: Array,
        user: String,
        guild: String,
      },
    },
    {
      name: "blacklist",
      data: { user: String },
    },
      {
      name: "levelguilds",
      data: { guild: String, onoff: { type: Boolean, default: false } },
      },
    ],
   });
  this.cooldowns = new Collection();
  this.commands = new Collection();
  }
  trimArray(ar,num,join = ", "){
   const l = ar.length - num
   return ar.length > num ? `${ar.splice(0,num).join(join)} ${join == "\n" ? "\n" : ""}...and ${l} more` : ar.join(", ")
  } 
  loadCommands() {
  const commandFolders = fs.readdirSync(`${__dirname}/commands`);
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`${__dirname}/commands/${folder}`)
      .filter((file) => file.endsWith(".js") || file.endsWith(".mjs"));
    for (const file of commandFiles) {
      const command = require(`${__dirname}/commands/${folder}/${file}`);
      if (!command.category) command.category = folder;
      this.commands.set(command.name, command);
    }
  }
  }
  loadEvents(){
  const eventFiles = fs
    .readdirSync(__dirname + "/events")
    .filter((file) => file.endsWith(".js") || file.endsWith(".mjs"));

  for (const file of eventFiles) {
    const event = require(`${__dirname}/events/${file}`);
    if (event.once) {
      this.once(event.name, (...args) => event.run(...args, this));
    } else {
      this.on(event.name, (...args) => event.run(...args, this));
    }
  }
  }
  embed(options, message){
  const emb = new MessageEmbed({ ...options, color: "RANDOM" })
    .setFooter(
      `${message.author.tag}`,
      message.author.displayAvatarURL({ dynamic: true, format: "png" })
    )
    .setTimestamp();
  if (options.colors && Array.isArray(options.colors))
    emb.setColor(
      options.colors[Math.floor(Math.random() * options.colors.length)]
    );

  return emb;
  };
}
module.exports = ShibaClient
