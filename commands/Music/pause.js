const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "resume",
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

    player.pause(true)
    message.reply('like i just pause some music. :O')
  },
};
