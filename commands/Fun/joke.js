const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "joke",
  aliases: ["jk", "textmeme", "j"],
  description: "seriously are you this dumb the name explains it all",
  run: async (client, message, args) => {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((joke) => joke.json())
      .then((json) => {
        const e = new MessageEmbed()
          .setTitle(json.setup)
          .setDescription(json.punchline);
        message.channel.send({ embeds: [e] });
      });
  },
};
