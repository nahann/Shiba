  const Screenshotter = require("discord-screenshot");
module.exports = {
    name: "screenshot",
    args: true,
    run: async(client, message, args) => {
        message.channel.startTyping()
        message.reply(} attachments: [await Screenshotter.screenshot(args[0])] }).then(()=> message.channel.stopTyping())
    }
}
