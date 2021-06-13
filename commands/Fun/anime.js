const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "anime",
  description: "Search for any anime",
  run: async(client, message, args) => {
    if (!args.length) return;
    const q = encodeURIComponent(args.join(" "));
    const s = `https://api.jikan.moe/v3/search/anime?q=${q}&limit=1`;
    console.log(s);
    const fetch1 = await fetch(s).then((res) => res.json());

    const fetch2 = fetch1.results[0].mal_id;
    const fetched = await fetch(`https://api.jikan.moe/v3/anime/${fetch2}`).then(
      (res) => res.json()
    );
    const e = new MessageEmbed()
      .setTitle(fetched.title)
      .setURL(fetched.url)
      .setColor("RANDOM")
      .setImage(fetched.image_url);
    const timear =
      fetched.aired.from !== null
        ? fetched.aired.to !== null
          ? [
              new Date(Date.parse(fetched.aired.from)).toLocaleDateString(),
              new Date(Date.parse(fetched.aired.to)).toLocaleDateString(),
            ]
          : [
              new Date(Date.parse(fetched.aired.from)).toLocaleDateString(),
              "Hasn't ended yet",
            ]
        : ["Hasn't started yet", "Hasn't started yet so can't end"];
    e.setDescription(
      `${require ("discord.js").splitMessage(fetched.synopsis)} \n **Airing**: ${fetched.airing}\n **Query ID**: ${
        fetched.mal_id
      } \n **Started At**: ${timear[0]} \n **Ended at**: ${
        timear[1]
      }\n **Episode count**: ${fetched.episodes} \n **Type**: ${
        fetched.type
      } \n **Rating** : ${
        fetched.rating !== null ? fetched.rating : "Unrated"
      } \n **Duration**: ${
        fetched.duration !== null ? fetched.duration : "Unknown"
      } \n \n Openings: \n ${
        fetched.opening_themes.length >= 1
          ? fetched.opening_themes.map((op) => `**"${op}"**`).join("\n")
          : "None"
      } \n Endings: \n ${
        fetched.ending_themes.length >= 1
          ? fetched.ending_themes.map((ed) => `**"${ed}"**`).join("\n")
          : "None"
      }`
    )

      .setTimestamp()
      .setFooter("h");
    message.reply({embed: e});
  },
};
