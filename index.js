const { Manager } = require("erela.js"),
      Spotify = require("erela.js-spotify"),
      ms1 = require("pretty-ms"),
      Client = require("./Client"),
      Discord = require("discord.js"),
      client = new Client({
          ws: { properties: { $browser: "Discord iOS" } },
          intents: 32767,
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
     { Database } = require("zapmongo");

mongoose
  .connect(config.mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database."));
String.prototype.splitEvery = function(n){
  return this.match(new RegExp('.{1,' + n + '}', 'g'));
}
client.suck = function(user){ return message.reply(`Sucking ${user.tag}'s dick`)}
client.loadEvents();
client.loadCommands();
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


// Lavalink and stuff
client.on("raw",(d) => client.music.updateVoiceState(d));
client.music.on("nodeConnect", (node) =>
  console.log(`✅ Node ${node.options.identifier} connected`)
);
client.music.on("nodeError", (node, error) =>
  console.log(
    `❎ Node ${node.options.identifier} had an error: ${error.message}`
  )
);
client.music.on("queueEnd", (player) => {
  const embed = new Discord.MessageEmbed()
    .setDescription('The queue has ended.')
    .setColor('RANDOM')
    .setTimestamp()

  client.channels.cache
    .get(player.textChannel)
    .send({ embeds: [embed] });

  player.destroy();
});
client.music.on("trackStart", (player, track) => {
  const channel = client.channels.cache.get(player.textChannel);

  const MusicEmbed = new Discord.MessageEmbed()
    .setTitle(`Playing ${track.title}`)
    .setDescription(`**Duration:** ${ms1(track.duration)}\n **Requested by:** ${track.requester.tag}\n **Author:** ${track.author}`)
    .setThumbnail(track.thumbnail)
    .setURL(track.uri)
    .setColor('RANDOM')
    .setTimestamp()

  channel.send({
    embeds: [MusicEmbed]
  })
})

client.login(config.token);
