module.exports={
   name: "ban",
   description: "Ban a user",
   options:[{
     name: "user",
     type: "USER",
     description: "The user to ban",
     required: true
   },{
     name: "reason",
     type: "STRING",
     description: "The reason to ban"
   }],
   run: async(client,command)=>{
     command.author = command.user
     await command.defer()
     if(!command.member.permissions.has("BAN_MEMBERS")) return command.editReply("You can't use this command!")
     const { guild } = command
     const user = command.options.get("user").value
     const reason = command.options.get("reason").value || "No reason provided"
     const member = await guild.members.fetch(user)
     member.send({embed: client.embed({title: `You have been banned from ${guild.name}!`,description: `Reason: **${reason}**`},command)})
     guild.members.ban(user).then(()=>command.editReply({embeds:[client.embed({description: `Banned ${member.user.username} for **${reason}**`},command)]}))
   }
}
