const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
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
        const b1 = new MessageButton().setLabel('1️⃣').setCustomID("b1").setStyle("PRIMARY")
        const b2 = new MessageButton().setLabel('2️⃣').setCustomID("b2").setStyle("SECONDARY")
        const b3 = new MessageButton().setLabel('3️⃣').setCustomID("b3").setStyle("SUCCESS")
        const b4 = new MessageButton().setLabel('4️⃣').setCustomID("b4").setStyle("DANGER")
        const b5 = new MessageButton().setLabel('5️⃣').setCustomID("b5").setStyle("PRIMARY")
        const row = new MessageActionRow().addComponents([b1,b2,b3,b4,b5])

        const msg = await message.reply({
          embeds: [client.embed({ description: results }, message)],
          components: [row]
        })


        let number

        try {
          const filter = (interaction) => interaction.user.id === message.author.id;

          await msg.awaitMessageComponentInteraction(filter, { max: 1, time: 100000, errors: ['time'] })
            .then(async(collected)=>{
              const interaction = await collected
              interaction.defer(true)
              if (interaction.label === 'b1') {
                number = '0'
              } else if (interaction.customID === 'b2') {
                number = '1'
              } else if (interaction.customID === 'b3') {
                number = '2'
              } else if (interaction.customID === 'b4') {
                number = '3'
              } else if (interaction.customID === 'b5') {
                number = '4'
              }
             interaction.editReply("Successful!")
            })
        } catch (e) { console.error(e) }

        const track = res.tracks[number];
        player.queue.add(track);

        if (player.playing) return message.reply({ embeds: [client.embed({ title: `Added ${track.title} to the queue`, description: `Duration : ${ms(track.duration)}\nAuthor: **${track.author}**` }, message).setThumbnail(track.thumbnail)] })
        if (!player.playing && !player.paused && !player.queue.length) return player.play();
    }
  },
};
