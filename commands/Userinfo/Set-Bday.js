const { Client, Message, MessageEmbed } = require('discord.js');
const UserinfoConfig = require("../../database/Userinfo");

module.exports = {
    name: 'set-bday',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const bday = args[0]
        await UserinfoConfig.findOneAndUpdate({ userId: message.author.id }, { Bday: bday }, )
        message.lineReplyNoMention(client.embed({ description: `Bday set to: \`${bday}\``}, message))
    }
}