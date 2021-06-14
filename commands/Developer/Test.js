const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'test',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.reply('h')
    }
}