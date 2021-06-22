const ms = require("pretty-ms")
module.exports={
  name: "np",
  aliases: ["nowplaying"],
  beta: true,
  description: "Get the currently playing song",
  run: async(client,message,args)=>{
   const player = client.music.players.get(message.guild.id)
   if(!player) return message.reply({embeds: [client.embed({title: "There is no song currently playing!"})]})
   const { current } = player.queue
   const s = current.endTime ? `\`\`\`diff\n+ ${ms(Date.now() - (current.endTime - current.duration))}/${ms(current.duration)}\`\`\`` : `\`\`\`Playlists do not currently support this feature.\`\`\``
   message.reply({
     embeds: [ client.embed({title: `Currently playing: **${current.title}** by **${current.author}**`,description: `${s}\nRequested by: **${current.requester.tag}**` },message).setURL(current.uri).setThumbnail(current.thumbnail) ]
   })
  }
}
