module.exports={
   name: "voiceStateUpdate",
   run: async(old,newc,client)=>{
     const { guild } = old

     if(guild.me.voice?.channel?.members.size == 1){
       const player = client.music.players.get(guild.id)
       if(!player) return;

       const channel = guild.channels.cache.get(player.textChannel)

       let texts = ['Everyone left me so i left crying', 'Everyone left me so i left **poping a chocky milk**']
       let Picker = Math.floor(Math.random() * texts.length)

       channel.send({ embeds: [client.embed({ description: texts[Picker] }, message)] })

       await player.destroy()
     }
   }
}
