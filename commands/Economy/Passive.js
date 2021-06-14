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
            await Schema.update({ userId: message.author.id }, { passive: true })
            message.reply({ embed: client.embed({ description: `Passive mode set to \`TRUE\``}, message)})
        }
        if(args[0].toLowerCase() === 'disable') {
            await Schema.update({ userId: message.author.id }, { passive: false })
            message.reply({ embed: client.embed({ description: `Passive mode set to \`FALSE\``}, message)})
        }
    }
}