const ms = require("pretty-ms")
const progressbar = require('string-progressbar');
module.exports = {
  name: "np",
  aliases: ["nowplaying"],
  description: "Get the currently playing song",
  run: async (client, message, args) => {
    const player = client.music.players.get(message.guild.id)
    if (!player) return message.reply({ embeds: [client.embed({ title: "There is no song currently playing!"}, message  )] })

    const { current } = player.queue
    const total = current.duration;
    const cr = player.position
    const progress = progressbar.splitBar(total, cr)[0]
    const s = `\`\`\`diff\n${progress}\n ${ms(player.position)}/${ms(current.duration)}\`\`\`` 
    message.reply({
      embeds: [client.embed({ title: `Currently playing: **${current.title}** by **${current.author}**`, description: `${s}\nRequested by: **${current.requester.tag}**` }, message).setURL(current.uri).setThumbnail(current.thumbnail)]
    })
  }
}
