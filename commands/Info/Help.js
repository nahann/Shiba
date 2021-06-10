const { Client, Message, MessageEmbed } = require('discord.js');
const GuildConfig = require('../../databse/GuildConfig');

module.exports = {
    name: 'help',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const data = await GuildConfig.findOne({ guildId: message.guild.id })
        const prefix = data.prefix;
        if(!args.length) {
            const embed = new MessageEmbed()
            .setAuthor(`Shibu Help Menu`, client.user.displayAvatarURL())
            .setDescription(`[[Support Server]](https://discord.gg/kxt4GsrEE6) [[Vote For Shibu]](https://top.gg/)`)
            .addFields(
                {
                    name: `🔧 Guild Config`,
                    value: `${prefix}help guild config`,
                    inline: true
                },
                {
                    name: `👋 Welcome System`,
                    value: `${prefix}help welcome`,
                    inline: true
                },
                {
                    name: `😅 Fun`,
                    value: `${prefix}help fun`,
                    inline: true
                }
            )
            .setColor("RANDOM")
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            message.lineReplyNoMention(embed)
        }
        if(args.slice(0).join(" ").toLowerCase() === 'guild config') return message.reply('test')
    }
}