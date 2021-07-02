const { MessageActionRow, MessageSelectMenu } = require("discord.js")
module.exports={
   name: "updates",
   description: "basically a newspaper",
   run: async(client,message,args)=>{
     const select = new MessageSelectMenu().setCustomID("select").setPlaceholder("Click me!").addOptions([
     {
       label: 'Latest updates',
       description: 'Get the latest updates of the bot!',
       value: 'updates',
     },
     {
       label: "Upcoming",
       description: "Upcoming updates of the bot",
       value: "upcoming"
     }
    ])
    const emobj = {
     updates: client.embed({description: "No updates yet!"},message),
     upcoming: client.embed({description: "Nothing determined to be upcoming yet"},message)
    }
    const row = new MessageActionRow().addComponents([select])
    const msg = await message.reply({embeds: [client.embed({description: "Choose an option in the select menu to get started!\n**Be aware the select menus only work for a minute.**"},message)],components: [row]})
    const filter = i => i.customID == "select" && i.user.id == message.author.id
    const collector = await msg.channel.createMessageComponentInteractionCollector({filter, time: 60000})
    collector.on("collect",(i) =>{
       const val = i.values[0]
       msg.edit({ embeds: [emobj[val]] })
    })
   collector.on("end",() => msg.edit({ components: [] }))
   }
}
