module.exports={
   name: "rank",
   aliases: ["xp","level"],
   run: async(client,message,args)=>{
     const target = message.mentions.users.first() || message.author; // Grab the target.
     const user = await client.Levels.fetch(target.id, message.guild.id); // Selects the target from the database.
     if (!user) return message.reply("This user does not have any levels!")
     console.log(user)
     message.reply({embeds: [client.embed({title: `${target.tag}'s Level`,description: `Level: ${user.level}\nXP: ${user.xp}`},message)]});
   }
}  
