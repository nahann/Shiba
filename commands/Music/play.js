const { MessageEmbed } = require("discord.js");
const ms = require("pretty-ms");

module.exports = {
  name: "play",
  aliases: ["p"],
  description: "Play music from youtube and more.",
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

    let player

    if (client.music.players.get(message.guild.id)) {
      player = client.music.players.get(message.guild.id)
    } else {
      player = client.music.create({
        guild: message.guild.id,
        voiceChannel: channel.id,
        textChannel: message.channel.id,
        volume: 100,
        selfDeafen: true,
      });
    }

    if (player.state !== "CONNECTED") player.connect();

    let res

    try {
      res = await player.search(url, message.author)
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
    console.log(res.loadType)
    switch (res.loadType) {
      case "NO_MATCHES":
        if (!player.queue.current) {
          player.destroy();
          return message.reply({ embeds: client.embed({ description: `Did not find anything.`, message }) })
        }


      case "TRACK_LOADED":
        res.tracks[0].endTime = Date.now() + res.tracks[0].duration
        player.queue.add(res.tracks[0]);

        if (player.playing) return message.reply({ embeds: [client.embed({ description: `Added **${res.tracks[0].title}** to the queue`},message).setThumbnail(res.tracks[0].thumbnail)] })
        if (!player.playing && !player.paused && !player.queue.length) return player.play();

      case "PLAYLIST_LOADED":
        player.queue.add(res.tracks);
        const length = res.tracks.length - 3
        const s = res.tracks.length <= 3 ? res.tracks.map(tr => `**${tr.title}**`).join(", ") : `${res.tracks.splice(0,3).map(tr => `**${tr.title}**`).join(", ")} ...and ${length} more`
        
        player.play();
        return message.reply({ embeds: [client.embed({ description: `Added ${s} to the queue`},message).setThumbnail(message.author.displayAvatarURL())], message })

      case "SEARCH_RESULT":
        let max = 5

        if (res.tracks.length < max) max = res.tracks.length;
        const results = await res.tracks
          .slice(0, max)
          .map((track, index) => `**${++index}** - \`${track.title}\``)
          .join("\n");


        const msg = await message.reply({
          embeds: [client.embed({ description: `${results}` }, message)]
        })

        msg.react('1️⃣')
        msg.react('2️⃣')
        msg.react('3️⃣')
        msg.react('4️⃣')
        msg.react('5️⃣')

        let number

        try {
          const filter = (reaction, user) => {
            return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
          };

          await msg.awaitReactions(filter, { max: 1, time: 100000, errors: ['time'] })
            .then(collected => {
              const reaction = collected.first();

              if (reaction.emoji.name === '1️⃣') {
                number = '0'
              } else if (reaction.emoji.name === '2️⃣') {
                number = '1'
              } else if (reaction.emoji.name === '3️⃣') {
                number = '2'
              } else if (reaction.emoji.name === '4️⃣') {
                number = '3'
              } else if (reaction.emoji.name === '5️⃣') {
                number = '4'
              }
            })
        } catch (e) { console.error(e) }

        const track = res.tracks[number];
        track.endTime = Date.now() + track.duration
        player.queue.add(track);

        if (player.playing) return message.reply({ embeds: [client.embed({ title: `Added ${track.title} to the queue`, description: `Duration : ${ms(track.duration)}\nAuthor: **${track.author}**` }, message).setThumbnail(track.thumbnail)] })
        if (!player.playing && !player.paused && !player.queue.length) return player.play();
    }
  },
};
