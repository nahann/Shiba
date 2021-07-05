  const Screenshotter = require("discord-screenshot");
module.exports = {
    name: "screenshot",
    args: true,
    run: async(client, message, args) => {
        message.channel.startTyping()
       const res = await Screenshotter.screenshot(args[0])
       console.log(res)
        message.reply({ files: [res] }).then(()=> message.channel.stopTyping())
    }
}
