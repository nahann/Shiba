const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'withdraw',
    aliases: ['with'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(isNaN(args[0])) return  message.reply({ embed: client.embed({ description: `Provide a real number.`}, message)})
        const Schema = await client.db.load('userEcos')
        const data = await Schema.findOne({ userId: message.author.id }) || await Schema.create({ userId: message.author.id })
        const walletToken = data.get('walletShibaToken')
        const bankToken = data.get('bankShibaToken')
        if(args[0] > bankToken) return  message.reply({ embed: client.embed({ description: `You don't have that much money in your bank account.`}, message)})
        Schema.decrement({ userId: message.author.id }, "bankShibaToken", args[0])
        Schema.increment({ userId: message.author.id }, "walletShibaToken", args[0])
        message.reply({ embed: client.embed({ description: `You have withdrawed ${args[0]} from your bank account.`}, message)})
    }
}