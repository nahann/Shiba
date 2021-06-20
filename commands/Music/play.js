const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "play",
  description: "Play music from youtube and more.",
  beta: true,
  run: async (client, message, args) => {
    const channel = message.member.voice.channel;
    const url = args.join(" ");

    if (!channel)
      return message.reply({
        embeds: [
          client.embed(
            { description: `Your not in a voice channel lol.` },
            message
          ),
        ],
        allowedMentions: { repliedUser: false },
      });

    if (!url)
      return message.reply({
        embeds: [
          client.embed(
            { description: `Oh you want me to play nothing lol?` },
            message
          ),
        ],
        allowedMentions: { repliedUser: false },
      });

    const player = client.music.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      volume: 100,
      selfDeafen: true,
    });

    player.connect();
  },
};
