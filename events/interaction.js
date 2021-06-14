module.exports={
  name: "interaction",
  run: async function(client, command){
    if(!command.isCommand()) return;
    client.slashes.get(command.commandName)?.run(client,command)
  }
}
