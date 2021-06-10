const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    userPermissions: 'BAN_MEMBERS',
    args: true,
    usage: '*unban [user id]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.lineReplyNoMention(client.embed({ description: `Shibu does not have the \`BAN_MEMBERS\` permission.`}, message))
        try {
            await message.guild.members.unban(args[0])
            message.lineReplyNoMention(client.embed({ description: `User has been unbanned`}, message))
        } catch (err) {
            message.lineReplyNoMention(client.embed({ description: `An error has occured` + err }, message))
        }
    }
}