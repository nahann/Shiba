const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    userPermissions: 'KICK_MEMBERS',
    args: true,
    usage: '*kick [user]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.lineReplyNoMention(client.embed({ description: `Shibu does not have the \`KICK_MEMBERS\` permission.`}, message))
        const member = message.mentions.members.first()
        const reason = args.slice(1).join(" ") || 'No Reason Provided'
        if(member.kickable) {
            await member.kick({ reason: reason })
            message.lineReplyNoMention(client.embed({ description: `${member.user.tag} has been kicked.`}, message))
        } else {
            message.lineReplyNoMention(client.embed({ description: `I cannot kick this user.`}, message))   
        } 
    }
}