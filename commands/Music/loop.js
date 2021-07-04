module.exports={
  name: "loop",
  description: "Loop the current track",
  run: async(client,message,args)=>{
    const method = args[0] == "queue" ? "setQueueRepeat" : "setTrackRepeat"
    const player = client.music.players.get(message.guild.id)
    if(!message.member.voice.channel || message.member.voice.channel.id !== player.voiceChannel) return
    player[method](true)
    message.reply({
       embeds: [ client.embed({title: `Looped ${player.queue.current.title}`},message) ]
    })
  }
}
