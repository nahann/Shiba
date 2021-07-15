module.exports ={
   name: "servers",
   aliases: ["guilds"],
   run: async(client,message,args)=>{
     const servers = []
     client.guilds.cache.map(guild => servers.push({ name: guild.name,count: membercount}))
     servers.sort((a,b)=> a.count - b.count)
     let i = 0
     const str = client.trimArray(servers.map(server =>{i++; `${i}: **${server.name}** -- ${server.count} members`}),30,"\n")
     message.reply({ embeds: [client.embed({title: `${client.user.username}'s servers`,description: str},message)] })
   }
}
