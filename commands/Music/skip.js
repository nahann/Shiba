const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip",
  description: "Skip your music",
  run: async (client, message, args) => {
    const player = message.client.music.players.get(message.guild.id);

    if (!player) {
      return message.reply({ embeds: [client.embed({ description: 'There is no music playing in this server.' }, message)] })
    }

    const channel = message.member.voice.channel;

    if (!channel) {
      return message.reply({ embeds: [client.embed({ description: 'Your not in a voice channel.' }, message)] })
    }

    if (channel.id !== player.voiceChannel) {
      return message.reply({ embeds: [client.embed({ description: 'Your not in the same voice channel then me.' }, message)] })
    }

    player.stop();

    let texts = ['You skiped a song what i liked for once.', 'Okay lets get started with next tune.', 'I hope the next song is a bangar.']
    let Picker = Math.floor(Math.random() * texts.length)

    message.reply({ embeds: [client.embed({ description: texts[Picker] }, message)] })
  },
};
