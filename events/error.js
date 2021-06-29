module.exports={
  name: "error",
  run: async(error,client)=>{
    if(!client.cmdmsg) return
    const message = client.cmdmsg
    console.error(error)
    message.reply({ embeds: [client.embed({title: "Error!",description: `\`\`\`\n${error}\`\`\``},message).setColor("RED")] })
  }
}
