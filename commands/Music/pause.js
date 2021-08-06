const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "pause",
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



    player.pause(true)

    const texts = ['Paused this banger song.', 'Paused this trash song.', 'Paused this ok song.']
    const Picker = Math.floor(Math.random() * texts.length)

    message.reply({ embeds: [client.embed({ description: texts[Picker] }, message)] })
  },
};
