module.exports={
   name: "beg",
   description: "idk beg",
   run: async(client,message)=>{
     const schema = await client.db.load("userEcos")
     const user = schema.findOne({ userId: message.author.id }) || schema.create({userId: message.author.id })
     
   }
}
