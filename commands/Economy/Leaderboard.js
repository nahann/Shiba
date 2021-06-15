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
        const leaderboard = await Schema.leaderboard((a, b) => b.walletShibaToken - a.walletShibaToken);
        return message.reply({ embed: client.embed({ fields: [{
            name: "⠀",
            value: "This displays the users with the most money in their wallets."
          }
        ], title: `Shiba Economy Leaderboard`, description: leaderboard.map((value, index) => {
            return `:coin: ${value.walletShibaToken} Shiba Token - ${client.users.cache.get(value.userId).tag || 'Unknown User'}`
        }).join("\n")
    }, message)})

    }
}