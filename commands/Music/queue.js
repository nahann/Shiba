module.exports={
  name: "queue",
  beta: true,
  run: async(client,message,args)=>{
   const player = client.music.players.get(message.guild.id)
   if(!player) return message.reply({embeds: [client.embed({title: "There is no song playing!"},message)]})
   const { queue } = player;
   let s = `Currently playing: **${queue.current.title}** by **${queue.current.author}**` 
   if(queue.length){
    let i = 0
    queue.forEach(track =>{
    i++
    s += `\n${i}: **${track.title}** by **${track.author}**`  
    })
   }
    message.reply({embeds: [client.embed({title: `Queue`,description: s},message)]})
  }
}
