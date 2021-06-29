module.exports={
  name: "error",
  run: async(error,client)=>{
    console.error(error)
    if(!client.cmdmsg) return
    if(`${error}`.split("\n").length <= 2){
      error = `${error.name}: ${error.message}\n${error.description || ""}`
    }
    const message = client.cmdmsg
    message.reply({ embeds: [client.embed({title: "Error!",description: `\`\`\`\n${error}\`\`\``},message).setColor("RED")] })
  }
}
