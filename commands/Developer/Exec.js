const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'exec',
    ownerOnly: true,
    guildOnly: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first()
        const content = args.slice(1).join(" ")
        message.author = user
        message.content = content;
        message.mentions.users.delete(message.mentions.users.first().id)
		await client.emit('message', message)
        message.react('🧃')
    }
}