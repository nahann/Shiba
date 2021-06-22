module.exports={
  name: "say",
  ownerOnly: true,
  args: true,
  run: async(client,message,args)=>{
    if(message.guild.me.permissions.has("MANAGE_MESSAGES")) await message.delete()
    const msg = args.join(" ").split(" --reply=")
    const msg1 = msg[0]
    const obj = msg[1] && !isNaN(msg[1]) ? {content: msg1,reply: { messageReference: msg[1] }} : { content: msg1 }
    message.channel.send(obj)
  }
}
