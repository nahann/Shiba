const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    description: "Play music from youtube and more.",
    run: async (client, message, args) => {
        const channel = message.member.voice.channel
        const url = args.slice(0).join(" ")

        if (!channel) return message.reply({
            embeds: [
                client.embed({ description: `Your not in a voice channel lol.` }, message),
            ],
            allowedMentions: { repliedUser: false },
        });
    },
};
