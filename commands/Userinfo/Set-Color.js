const { Client, Message, MessageEmbed } = require('discord.js');
const UserinfoConfig = require("../../database/Userinfo");

module.exports = {
    name: 'set-color',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const color = args[0].toUpperCase()
        await UserinfoConfig.findOneAndUpdate({ userId: message.author.id }, { Color: color }, )
        message.lineReplyNoMention(client.embed({ description: `Color set to: \`${color}\``}, message))
    }
}