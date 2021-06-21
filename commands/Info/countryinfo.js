const fetch = require("node-fetch")
const { MessageAttachment } = require("discord.js")
module.exports={
  name: "countryinfo",
  description: "Get any country's info",
  args: true,
  aliases: ["country"],
  run: async(client,message,args)=>{
     const url = `https://restcountries.eu/rest/v2/name/${args.join(" ")}`
     try{
       const fetched = await fetch(url).then(res => res.json())
       if(!fetched.length) return message.reply("That country does not exist!")
       const result = fetched[0]
       const buffer = await fetch(result.flag).then(file => file.buffer())
       const flag = new MessageAttachment(buffer,"flag.png")
       message.reply({embeds: [client.embed({title: `Info for ${result.name}`},message)
                               .addField("Top Level Domain(s)",result.topLevelDomain?.join(", ") || "None",true)
                               .addField("Capital",result.capital,true)
                               .addField("Alternate Names",result.altSpellings?.join(", ") || "None")
                               .addField("Continent",result.region,true)
                               .addField("Population",result.population.toString(),true)
                               .addField("Demonym",result.demonym,true)
                               .addField("Native Name",result.nativeName,true)
                               .addField("Languages",result.languages.map(l => l.name).join(", "),true)
                               .setThumbnail("attachment://flag.png")
                              ], attachments: [flag]
                     })
     }catch(e) {
      console.error(e)
      message.reply("An error occured, this has been reported.")
     }
  }
}
