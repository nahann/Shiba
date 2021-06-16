const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../../config.json");

module.exports = {
  name: "contributors",
  description: "List the contributors for Shiba",
  run: async(client, message, args) => {
    
    var contributors = await (await fetch("https://api.github.com/repos/nahann/Shiba/contributors", {
        method: "GET",
        headers: {
          "Authorization": `token ${config.apiToken}`
        }
      })).json();
    
      contributors = contributors.map(contributor => new Object({
        name: contributor.login,
        value: `[Click Me To Visit Their GitHub](${contributor.html_url})`,
        inline: true,
      }));

      const embed = new Discord.MessageEmbed()
      .setTitle("All The Contributors That Are Helping Make Shiba Awesome!")
      .setDescription("Be Sure To Drop A Star On The Repo, [Here!](https://github.com/nahann/Shiba)")
      .addFields(contributors)
      .setColor("RANDOM")
      .setFooter(`Shiba - This Command Was Made By ${client.users.cache.get('763767239018938368').tag}!`);
    
      message.reply({ embeds: [embed] });
  }
};
