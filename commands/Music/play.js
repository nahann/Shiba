const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "play",
  description: "Play music from youtube and more.",
  beta: true,
  run: async (client, message, args) => {
    const channel = message.member.voice.channel;
    const url = args.join(" ");

    if (!channel)
      return message.reply({
        embeds: [
          client.embed(
            { description: `You're not in a voice channel lol.` },
            message
          ),
        ],
        allowedMentions: { repliedUser: false },
      });

    if (!url)
      return message.reply({
        embeds: [
          client.embed(
            { description: `Oh you want me to play nothing lol?` },
            message
          ),
        ],
        allowedMentions: { repliedUser: false },
      });

    const player = client.music.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      volume: 100,
      selfDeafen: true,
    });

    player.connect();

    let music

    try {
      music = await player.search(url, message.author)
    } catch {
      return message.reply({
        embeds: [
          client.embed(
            { description: `Something went wrong with searching for it.` },
            message
          ),
        ],
        allowedMentions: { repliedUser: false },
      });
    }
    const track = music.tracks[0]
    player.queue.add(music.tracks[0]);
    
    if (!player.playing && !player.paused && !player.queue.size) {
      message.reply({embeds: [client.embed({title: `Playing ${track.title}`,description: `Duration: ${require("pretty-ms")(track.duration)}\nRequested by: ${message.author.tag}`},message).setURL(track.uri).setThumbnail(track.thumbnail)]})
      player.play();
    }

    if (!player.playing && !player.paused && player.queue.totalSize === music.tracks.length) player.play();
  },
};
