const ms = require("ms")
module.exports={
  name: "seek",
  description: "seek to a specific part of a song!",
  run: async(client,message,args)=>{
    if(!args.length) return 
    const player = client.music.players.get(message.guild.id)
    if(!player) return message.reply({embeds: [client.embed({title: "There is no song playing in this server!"},message)]})
    const timetoseek = ms(args[0])
    if(isNaN(timetoseek)) return
    message.reply({embeds: [client.embed({title: `Seeked to ${args[0]}!`},message)]})
    player.seek(timetoseek)
    
  }
}
