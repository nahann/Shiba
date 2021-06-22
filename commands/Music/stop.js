const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "stop",
  aliases: ["s"],
  description: "Stop music.",
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

    player.destroy();

    let texts = ['You stoped a song what i liked for once.', 'You just wanted to get rid of me **pops a chocky milk**', 'I stoped the song anyway i did not like that song.']
    let Picker = Math.floor(Math.random() * texts.length)

    message.reply({ embeds: [client.embed({ description: texts[Picker] }, message)] })
  },
};
