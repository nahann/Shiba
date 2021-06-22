module.exports={
  name: "shuffle",
  description: "Shuffle your quuee, queeueeu, however the fuck you spell it",
  run: async(client,message,args)=>{
    if(!message.member.voice.channel) return;
    const player = client.music.players.get(message.guild.id)
    if(!player) return;
    await player.queue.shuffle()
    message.reply({embeds: [client.embed({title: "Shuffled queeeueueurueurrueueueue."},message)]})
  }
}
