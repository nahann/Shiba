const { Client, Message, MessageEmbed } = require('discord.js');
const { exec } = require('child_process')

module.exports = {
    name: 'console',
    description: `Executes stuff in the console.`,
    ownerOnly: true,
    category: `Developer`,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        exec(args.join(" "))
    }
}