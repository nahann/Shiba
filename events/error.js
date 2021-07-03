module.exports={
  name: "error",
  run: async(error,client)=>{
    console.error(error)
    if(!client.cmdmsg) return
    if(`${error}`.split("\n").length <= 2){
      error = require("util").inspect(error)
    }
    const message = client.cmdmsg
    message.reply({ embeds: [client.embed({title: "Error!",description: `\`\`\`\n${error}\`\`\`\nCommand: ${message.command?.name || "idk"}`},message).setColor("RED")] })
  }
}
