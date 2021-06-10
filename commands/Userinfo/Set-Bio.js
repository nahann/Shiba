const { Client, Message, MessageEmbed } = require('discord.js');
const UserinfoConfig = require('../../databse/Userinfo')

module.exports = {
    name: 'set-bio',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const bio = args.join(" ")
        const data = await UserinfoConfig.findOne({ userId: message.author.id })
        if(data) await UserinfoConfig.findOneAndUpdate({ userId: message.author.id }, { Bio: bio })
        if(!data) await UserinfoConfig.create({
            userId: message.author.id,
            Bio: bio,
        })
        message.lineReplyNoMention(client.embed({ description: `Bio set to: \`${bio}\``}, message))
    }
}