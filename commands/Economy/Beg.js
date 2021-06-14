module.exports={
   name: "beg",
   beta: true,
   description: "idk beg",
   cooldown: 300000,
   run: async(client,message)=>{
     const schema = await client.db.load("userEcos")
     const user = await schema.findOne({ userId: message.author.id }) || await schema.create({userId: message.author.id })
     const tokens = Math.floor(Math.random() * 25)
     schema.increment({userId: message.author.id},"shibaToken",tokens)
     message.reply({embed: client.embed({description: `You begged and got ${tokens} Shiba Token`},message)})
   }
}
