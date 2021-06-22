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
     embeds: [ client.embed({title: `Currently playing: **${current.title}** by **${current.author}**`,description: `\`\`\`diff\n+ ${ms(Date.now() - (current.endTime - current.duration))}/${ms(current.duration)}\`\`\`\nRequested by: **${track.requester.tag}`},message).setURL(current.uri).setThumbnail(current.thumbnail) ]
   })
  }
}
