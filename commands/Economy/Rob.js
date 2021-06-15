const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rob',
    aliases: ['steal'],
    beta: true,
    args: true,
    usage: '*passive [true or false]',
    cooldown: 3600000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const schema = await client.db.load("userEcos")
        const user = message.mentions.users.first();
        if(message.author.id === user.id) return message.reply({ embed: client.embed({ description: `You cannot rob yourself.`}, message)})
        const authorData = await schema.findOne({ userId: message.author.id })
        const userData = await schema.findOne({ userId: user.id })
        const userToken = userData.get('shibaToken')
        const authorPassive = authorData.get('Passive')
        const userPassive = userData.get('Passive')
        if(userToken < 500)return message.reply({ embed: client.embed({ description: `The person you are trying to rob has less than 500 Shiba Token.`}, message)})
        if(authorPassive === true) return message.reply({ embed: client.embed({ description: `You cannot rob someone while you are on passive mode.`}, message)})
        if(userPassive === true) return message.reply({ embed: client.embed({ description: `The user you are trying to rob is on passive mode.`}, message)})
        const token = Math.floor(Math.random() * 350);
        schema.increment({ userId: message.author.id }, "shibaToken", token)
        schema.decrement({ userId: user.id }, "shibaToken", token)
        return message.reply({ embed: client.embed({ description: `${message.author.username} stole ${token} from ${user.username}`}, message)})
    }
}