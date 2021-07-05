  const Screenshotter = require("discord-screenshot");
  const ShibaError = require("../../uti/ShibaError")
module.exports = {
    name: "screenshot",
    args: true,
    run: async(client, message, args) => {
       if(message.guild.id == "655109296400367618") return client.emit("error", new ShibaError("You can't use this command in your server because salvage gets butthurt"))
       if(["porn","sex","xhamster","hentai","fuck","gore"].some(y => args[0].toLowerCase().includes(y))) return client.emit("error",new ShibaError("NSFW sites are not allowed"))
        message.channel.startTyping()
       const res = await Screenshotter.screenshot(args[0])
       console.log(res)
        message.reply({ files: [res] }).then(()=> message.channel.stopTyping())
    }
}
