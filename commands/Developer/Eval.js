const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'eval',
    guildOnly: true,
    ownerOnly: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const result = args.join(" ")
        try {
            const evaled = await eval(result);
        } catch (err) {
            message.lineReplyNoMention(client.embed({ description: `AN ERROR  HAS OCCURED: ${err}`}, message))
        }
    }
}