module.exports={
  name: "error",
  run: async(error,client)=>{
    console.error(error)
    if(!client.cmdmsg) return
    if(`${error}`.split("\n").length <= 2){
      error = require("util").inspect(error)
    }
    const message = client.cmdmsg
    const msg = await message.reply({ embeds: [client.embed({title: "Error!",description: `Join our [support server](https://discord.gg/JweWz375ej) and report this error.\n\`\`\`\n${error}\`\`\`\nCommand: ${message.command?.name || "idk"}`},message).setColor("RED")] })
    (await client.channels.fetch("860179405824983090")).send({ embeds: msg.embeds })
  }
}
