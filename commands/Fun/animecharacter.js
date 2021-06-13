const fetch = require("node-fetch");
const { MessageEmbed, Util } = require("discord.js");
const leven = require("leven");
module.exports = {
  name: "acharacter",
  aliases: ["achar", "animc", "ac"],
  description: "Search for any anime/manga character",
  run: async (bot, message, args) => {
    if (!args.length) return;
    const ar = args.join(" ");
    const arg = encodeURIComponent(ar);
    const s = `https://api.jikan.moe/v3/search/character?q=${arg}&limit=1`;
    console.log(s);
    const f = await fetch(s).then((res) => res.json());
    let fee;
    let feeu;
    console.log(
      [f.results[0].name.split(",")[1], f.results[0].name.split(",")[0]].join(
        " "
      )
    );
    if (
      (f.status && f.status == 404) ||
      leven(
        ar,
        [f.results[0].name.split(",")[1], f.results[0].name.split(",")[0]].join(
          " "
        )
      ) > 6
    ) {
      feeu = await fetch(
        `https://api.jikan.moe/v3/search/character?q=${encodeURIComponent(
          ar
            .replace(/o/g, "ou")
            .replace(/u/g, "uu")
            .replace(/ouu/g, "ou")
            .replace("suuke", "suke")
        )}`
      ).then((e) => e.json());
      if (feeu.status && feeu.status == "404") {
        message.channel.send("Character not found");
      } else {
        fee = feeu.results[0].mal_id;
      }
    } else {
      fee = f.results[0].mal_id;
    }
    const fe = await fetch(`https://api.jikan.moe/v3/character/${fee}`).then(
      (u) => u.json()
    );

    const e = new MessageEmbed()
      .setTitle(`**${fe.name}**`)
      .setDescription(
        `Nicknames: \n ${
          fe.nicknames.length >= 1
            ? fe.nicknames.map((nick) => `**""${nick}**`).join("\n")
            : "None"
        } \n Anime's: \n ${
          fe.animeography.length >= 1
            ? fe.animeography.map((anime) => `**${anime.name}**`).join("\n")
            : "**None**"
        } \n Mangas: \n ${
          fe.mangaography.length >= 1
            ? fe.mangaography.map((manga) => `**${manga.name}**`).join("\n")
            : "**Unknown**"
        }`
      )
      .setThumbnail(fe.image_url)
      .setColor("RANDOM");
    const fdejd = fe.about.length - 2039;
    let bioemb = new MessageEmbed()
      .setDescription(
        `Biography: **${
          fe.about.length > 2048
            ? `${fe.about
                .slice(0, -fdejd)
                .split("\\r")
                .join("\r")
                .split("\\n")
                .join("\n")}...`
            : fe.about.split("\\r").join("\r").split("\\n").join("\n")
        }**`
      )
      .setColor("RANDOM");
    e.description += `\n ${bioemb.description}`;

    message.send(e);
  },
};
