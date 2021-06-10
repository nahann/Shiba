const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'purge',
    aliases: ['clear'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const purge = args[0]
        if(isNaN(purge)) return message.lineReplyNoMention(client.embed({ description: `Provide a real number.`}, message))
        if(purge > 99) return message.lineReplyNoMention(client.embed({ description: `You cannot delete more than 99 memssages`}, message))
        message.channel.bulkDelete(purge)
        message.lineReplyNoMention(client.embed({ description: `${purge} messages have been deleted.`}, message))
    }
}   