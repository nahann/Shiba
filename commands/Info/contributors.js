const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "contributors",
  description: "List the contributors for Shiba",
  run: async(client, message, args) => {
    const maintainersJson = await fetch('/repos/nahann/Shiba/contributors', {
        method: 'GET',
        headers: {
          'Authorization': `token ${await fetch('https://jsonblob.com/api/jsonBlob/f7a275d2-b119-11eb-b1f1-09924f3a0c66')).json()).apiKey}`
        }
      }).json();
    
      const maintainers = [];
    
      const push = `{name: ${maintainersJson.login}, value: \`[Click Me To Visit Their GitHub](${maintainersJson.html_url})\`, inline: true}`;
    
      await maintainers.push(push);
    
      const embed = new Discord.MessageEmbed()
      .setTitle("All The Maintainers That Are Working On Shiba!")
      .setDescription("Be sure to drop a star on the repo, [here!](https://github.com/nahann/Shiba)")
      .addFields(maintainers)
      .setFooter("Shiba - This command was made by `molai.dev#9999`!");
    
      message.reply({ embed: embed });
  }
