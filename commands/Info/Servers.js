module.exports ={
   name: "servers",
   aliases: ["guilds"],
   run: async(client,message,args)=>{
     const servers = []
     client.guilds.cache.map(guild => servers.push({ name: guild.name,count: guild.memberCount}))
     servers.sort((a,b)=> a.count - b.count)
     let i = 0
     const ar = servers.map(server =>{i++; return `${i}: **${server.name}** -- ${server.count} members`})
     const str = client.trimArray(ar,20,"\n")
     console.log(ar)
     message.reply({ embeds: [client.embed({title: `${client.user.username}'s servers`,description: str},message)] })
   }
}
