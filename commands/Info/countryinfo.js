const { fetch } = require("node-fetch")
module.exports={
  name: "countryinfo",
  description: "Get any country's info",
  args: true,
  aliases: ["country"],
  run: async(client,message,args)=>{
     const url = `https://restcountries.eu/rest/v2/name/${args[0]}`
     try{
       const fetched = await fetch(url).then(res => res.json())
       if(!fetched.length) return message.reply("That country does not exist!")
       const result = fetched[0]
       message.reply({embeds: [client.embed({title: `Info for ${result.name}`},message).addField("Top Level Domain(s)",result.topLevelDomain?.join(", ") || "None",true).addField("Capital",result.capital,true).addField("Alternate Names",results.altSpellings?.join(", ") || "None")]})
     }
  }
}
