  const Screenshotter = require("discord-screenshot");
module.exports = {
    name: "screenshot",
    args: true,
    run: async(client, message, args) => {
       if(["porn","sex","xhamster","hentai","fuck"].some(y => args[0].includes(y))) return client.emit("error",new Error("NSFW sites are not allowed"))
        message.channel.startTyping()
       const res = await Screenshotter.screenshot(args[0])
       console.log(res)
        message.reply({ files: [res] }).then(()=> message.channel.stopTyping())
    }
}
