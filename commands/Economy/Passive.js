const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'passive',
    beta: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const Schema = await client.db.load('userEcos')
        if(args[0].toLowerCase() === 'enable') {
            Schema.update({ userId: message.author.id }, { passive: true })
        }
        if(args[0].toLowerCase() === 'disable') {
            Schema.update({ userId: message.author.id }, { passive: false })
        }
    }
}