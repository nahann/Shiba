const fetch = require("node-fetch");
module.exports = {
  name: "covid",
  aliases: ["corona", "covid19", "cr", "coronavirus"],
  description: "returns the COVID-19 stats of a country",
  run: async (client, message, args) => {
    if (!args.length) message.reply("You have to specify a country!");
    fetch(`https://disease.sh/v3/covid-19/countries/${args.join(" ")}`)
      .then((info) => info.json())
      .then((json) => {
        if (json.country == "undefined") {
          message.channel.send(
            "Either that's not a real country, or you spelled it wrong."
          );
        }

        const e = client.embed({title: `COVID-19 stats of ${json.country}`},mesaage)
          .setThumbnail(json.countryInfo.flag)
          .setDescription(
            ` Cases today: \`\`\`${json.todayCases}\`\`\`\nDeaths today: \`\`\`${json.todayDeaths}\`\`\`\nAll cases: ${json.cases}\n All deaths: ${json.deaths}\n All recoveries: ${json.recovered}\n Active cases right now: ${json.active} `
          )
        message.reply({embed: e});
      });
  },
};
