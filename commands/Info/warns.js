module.exports={
  name: "warns",
  aliases: ["warnings"],
  run: async(client,message,args)=>{
    try{
    let user = args.length ? message.mentions.users.first() || message.guild.members.cache.find(m => m.user.tag.includes(args[0]))?.user : message.author
    if(!user) return 
    const schema = await client.db.load("warns")
    const docs = await schema.findOne({ user: user.id })
    if(!docs || !docs.warns.length) return message.reply("This user has no warns!")
    const mapped = doc.warns.map(w =>`Warn id: ${w.id}\nReason: \"${w.reason}\"\nDate: ${w.date.toLocaleDateString()}`)
    return message.reply({embeds: [client.embed({title: `Warns for ${user.tag}`,description: mapped.join("\n\n")},message)]})
    }catch(e){
      console.error(e)
      message.reply({content: `An error occured! ${e}`,code: true})
    }
  }
}
