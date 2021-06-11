const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    userPermissions: 'BAN_MEMBERS',
    args: true,
    guildOnly: true,
    usage: '*ban [user]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.lineReplyNoMention(client.embed({ description: `Shibu does not have the \`BAN_MEMBERS\` permission.`}, message))
        const member = message.mentions.members.first()
        const reason = args.slice(1).join(" ") || 'No Reason Provided'
        if(member.bannable) {
            await member.ban({ reason: reason })
            message.lineReplyNoMention(client.embed({ description: `${member.user.tag} has been banned.`}, message))
        } else {
            message.lineReplyNoMention(client.embed({ description: `I cannot ban this user.`}, message))   
        } 
        
    }
}