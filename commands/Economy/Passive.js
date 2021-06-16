const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'passive',
    beta: true,
    args: true,
    usage: '*passive [enable or disable]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const Schema = await client.db.load('userEcos')
        if(args[0].toLowerCase() === 'enable') {
            await Schema.update({ userId: message.author.id }, { Passive: true })
            message.reply({ embeds: [client.embed({ description: `Passive mode set to \`TRUE\``}, message)]})
        }
        if(args[0].toLowerCase() === 'disable') {
            await Schema.update({ userId: message.author.id }, { Passive: false })
            message.reply({ embeds: [client.embed({ description: `Passive mode set to \`FALSE\``}, message)]})
        }
    }
}
