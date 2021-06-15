const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'balance',
    aliases: ['bal'],
    beta: true,
    
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;
        const Schema = await client.db.load('userEcos')
        const data = await Schema.findOne({ userId: user.id }) || await Schema.create({ userId: user.id })
        const token = data.get('shibaToken')
        message.reply({ embed: client.embed({ title: `${user.username}'s wallet`, description: `:coin: ${token} Shiba Token`}, message)})
    }
}