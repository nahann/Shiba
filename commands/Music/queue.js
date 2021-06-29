module.exports={
  name: "queue",
  aliases: ["q"],
  run: async(client,message,args)=>{
   const player = client.music.players.get(message.guild.id)
   if(!player) return message.reply({embeds: [client.embed({title: "There is no song playing!"},message)]})
   const { queue } = player;
   let s = [`Currently playing: **${queue.current.title}** by **${queue.current.author}**`]
   if(queue.length){
    let i = 0
    queue.forEach(track =>{
    i++
    s.push(`\n${i}: **${track.title}** by **${track.author}**`)
    })
   }
    message.reply({embeds: [client.embed({title: `Queue`,description: client.trimArray(s,10,"\n")},message)]})
  }
}
