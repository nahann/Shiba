//https://random-d.uk/api/v2/random
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "covid",
  aliases: ["corona", "covid19", "cr", "coronavirus"],
  description: "returns the COVID-19 stats of a country",
  run: async (bot, message, args) => {
    if (!args.length) message.channel.send("You have to specify a country!");
    fetch(`https://disease.sh/v3/covid-19/countries/${args.join(" ")}`)
      .then((ducc) => ducc.json())
      .then((json) => {
        if (json.country == "undefined") {
          message.channel.send(
            "Either that's not a real country, or you spelled it wrong."
          );
        }

        const e = new MessageEmbed()
          .setTitle(`The covid-19 stats of ${json.country}`)
          .setThumbnail(json.countryInfo.flag)
          .setDescription(
            ` Cases today: \`\`\`${json.todayCases}\`\`\`\nDeaths today: \`\`\`${json.todayDeaths}\`\`\`\nAll cases: ${json.cases}\n All deaths: ${json.deaths}\n All recoveries: ${json.recovered}\n Active cases right now: ${json.active} `
          )
          .setColor("RANDOM");
        message.channel.send(e);
      });
  },
};
