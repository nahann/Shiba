const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");

const Discord = require("discord.js"),
  client = new Discord.Client({
    ws: { properties: { $browser: "Discord iOS" } },
    intents: require("discord.js").Intents.ALL,
    allowedMentions: {
      repliedUser: false,
      parse: ["users", "roles"],
    },
  }),
  config = require("./config.json"),
  fs = require("fs"),
  GuildConfig = require("./database/GuildConfig"),
  WelcomeConfig = require("./database/Welcome"),
  UserinfoConfig = require("./database/Userinfo"),
  mongoose = require("mongoose"),
  ms = require("ms"),
  { Database } = require("zapmongo");

mongoose
  .connect(config.mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database.");
  });

client.db = new Database({
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
client.cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
client.loadCommands = function () {
  const commandFolders = fs.readdirSync(`${__dirname}/commands`);
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./commands/${folder}/${file}`);
      if (!command.category) command.category = folder;
      client.commands.set(command.name, command);
    }
  }
};
client.loadEvents = function () {
  const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.run(...args, client));
    } else {
      client.on(event.name, (...args) => event.run(...args, client));
    }
  }
};
client.loadEvents();
client.loadCommands();
client.embed = (options, message) => {
  const emb = new Discord.MessageEmbed({ ...options, color: "RANDOM" })
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
client.music = new Manager({
  nodes: [
    {
      host: "localhost",
      port: 2333,
      password: config.password,
    },
  ],
  plugins: [
    new Spotify({
      clientID: config.spotifyid,
      clientSecret: config.spotifysecret,
    }),
  ],
  autoPlay: true,

  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
});

client.on("raw", (d) => client.music.updateVoiceState(d));
client.music.on("nodeConnect", (node) =>
  console.log(`✅ Node ${node.options.identifier} connected`)
);
client.music.on("nodeError", (node, error) =>
  console.log(
    `❎ Node ${node.options.identifier} had an error: ${error.message}`
  )
);
client.manager.on("trackStart", (player, track) => {
  const channel = client.channels.cache.get(player.textChannel);

  channel.send(`playing ${track.title} i will change the text soon i am just testing`)
})

client.login(config.token);
