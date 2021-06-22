const ms = require("pretty-ms")
module.exports={
  name: "np",
  aliases: "nowplaying",
  description: "Get the currently playing song",
  run: async(client,message,args)=>{
   const player = client.music.players.get(message.guild.id)
   if(!player) return message.reply({embeds: [client.embed({title: "There is no song currently playing!"})]})
   const { current } = player.queue
   message.reply({
     embeds: [ client.embed({title: `Currently playing: **${track.title}** by **${track.author}**`,description: `${ms(track.endTime - Date.now())}/${track.duration}`}).setURL(track.uri).setThumbnail(track.thumbnail) ]
   })
  }
}
