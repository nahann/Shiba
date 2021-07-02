const os = require("os-utils")
const Ms = require("pretty-ms")
module.exports={
   name: "info2",
   description: "System info and stuff idk",
   run: async(client,message,args)=>{
     const mempercentage = `${((os.freemem() / os.totalmem()) * 100)}%`
     const usedmem = `${(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}%`
     message.reply({
      embeds: [client.embed({title: "System Info for Shiba"},message).addField("Platform",os.platform(),true).addField("Free Memory",mempercentage,true).addField("Used Memory",usedmem,true).addField("System Uptime",ms(os.sysUptime() * 1000),true).addField("Process Uptime",ms(os.processUptime() * 1000),true)]
     })
   }
}
