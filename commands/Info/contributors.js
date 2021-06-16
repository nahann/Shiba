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
        value: `[Click me to visit their GitHub](${contributor.html_url})`,
        inline: true,
      }));

      const embed = new Discord.MessageEmbed()
      .setTitle("All the contributors that are helping make Shiba awesome!")
      .setDescription("Be sure to drop a star on the repo, [here!](https://github.com/nahann/Shiba)")
      .addFields(contributors)
      .setColor("RANDOM")
      .setFooter(`Shiba - This command was made by molai.dev#9999!`);
    
      message.reply({ embeds: [embed] });
  }
};
