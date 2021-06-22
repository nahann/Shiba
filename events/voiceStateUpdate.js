const Discord = require('discord.js')

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
      
       const embed = new Discord.MessageEmbed()
       .setDescription(texts[Picker])
       .setColor('RANDOM')
       .setTimestamp()

       
       channel.send({ embeds: [embed] })

       await player.destroy()
     }
   }
}
