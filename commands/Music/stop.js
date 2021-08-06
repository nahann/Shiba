const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "stop",
  aliases: ["s"],
  description: "Stop music.",
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

    player.destroy();

    const texts = ['You stopped a song that i liked for once.', 'You just wanted to get rid of me **pops a choccy milk**', 'I stopped the song, I didn\'t like it anyway.']
    const Picker = Math.floor(Math.random() * texts.length)

    message.reply({ embeds: [client.embed({ description: texts[Picker] }, message)] })
  },
};
