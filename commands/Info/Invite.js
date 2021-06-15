const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.reply({ embed: client.embed({ description: `Click **[here](https://discord.com/api/oauth2/authorize?client_id=838254815225970739&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=bot%20applications.commands)** for your link to invite Shiba.`}, message)})
    }
}