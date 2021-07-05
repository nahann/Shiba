  
const Screenshoter = require("discord-screenshot");
module.exports = {
    name: "screenshot",
    args: true,
    run: async(client, message, args) => {
        message.reply(await Screenshotter.screenshot(args[0]))
    }
}
