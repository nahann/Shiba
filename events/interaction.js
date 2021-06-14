module.exports={
  name: "interaction",
  run: async (command, client) => {
    if(!command.isCommand()) return;
    client.slashes.get(command.commandName)?.run(client,command)
  }
}
