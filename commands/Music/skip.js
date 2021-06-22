const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip",
  description: "Skip your music",
  beta: true,
  run: async (client, message, args) => {
    const player = message.client.music.players.get(message.guild.id);

    if (!player) {
        message.reply('no music playing')
    }

    const channel = message.member.voice.channel;

    if (!channel) {
        message.reply('your not in a vc.')
    } 

    if (channel.id !== player.voiceChannel) {
        message.reply('not same vc so noob')
    } 

    player.stop();

    let texts = ['You skiped a song what i liked for once.', 'Okay lets get started with next tune.', 'I hope the next song is a bangar.']
    let Picker = Math.floor(Math.random() * texts.length)

    message.reply({ embeds: [client.embed({ description: texts[Picker] }, message)] })
  },
};
