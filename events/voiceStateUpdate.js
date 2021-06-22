module.exports={
   name: "voiceStateUpdate",
   run: async(old,newc,client)=>{
     const { guild } = old
     if(guild.me.voice?.channel?.members.size == 1){
       const player = client.music.players.get(guild.id)
       if(!player) return
       const vchannel = guild.channels.cache.get(player.voiceChannel)
       const channel = guild.channels.cache.get(player.textChannel)
       console.log(vchannel.type)
       channel.send("Everyone left, so I did too!")
       await vchannel.leave()
     }
   }
}
