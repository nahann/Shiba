const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    beta: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const Schema = await client.db.load('userEcos')
        const leaderboard = await Schema.leaderboard((a, b) => b.shibaToken - a.shibaToken);
        return message.reply({ embed: client.embed({ title: `Shiba Economy Leaderboard`, description: leaderboard.map((value, index) => {
            return `:coin: ${value.shibaToken} Shiba Token - ${client.users.cache.get(value.userId).tag || 'Unknown User'}`
        }).join("\n")
    }, message)})

    }
}