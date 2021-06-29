module.exports={
  name: "error",
  run: async(error,client)=>{
    console.error(error)
    if(!client.cmdmsg) return
    const message = client.cmdmsg
    message.reply({ embeds: [client.embed({title: "Error!",description: `\`\`\`\n${error}\`\`\``},message).setColor("RED")] })
  }
}
