const fetch = require("node-fetch");
const { MessageEmbed, Util } = require("discord.js");
const leven = require("leven");
module.exports = {
  name: "acharacter",
  aliases: ["achar", "animc", "ac"],
  description: "Search for any anime/manga character",
  run: async (bot, message, args) => {
    if (!args.length) return;
    const arg1 = args.join(" ");
    const arg = encodeURIComponent(arg1);
    const s = `https://api.jikan.moe/v3/search/character?q=${arg}&limit=1`;
    const f = await fetch(s).then((res) => res.json());
    let fetch1;
    let fetch2;
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
      fetch2 = await fetch(
        `https://api.jikan.moe/v3/search/character?q=${encodeURIComponent(
          ar
            .replace(/o/g, "ou")
            .replace(/u/g, "uu")
            .replace(/ouu/g, "ou")
            .replace("suuke", "suke")
        )}`
      ).then((e) => e.json());
      if (fetch2.status && fetch2.status == "404") {
        message.channel.send("Character not found");
      } else {
        fetch1 = fetch2.results[0].mal_id;
      }
    } else {
      fetch1 = f.results[0].mal_id;
    }
    const fetch3 = await fetch(`https://api.jikan.moe/v3/character/${fee}`).then(
      (u) => u.json()
    );

    const e = new MessageEmbed()
      .setTitle(`**${fetch3.name}**`)
      .setDescription(
        `Nicknames: \n ${
          fetch3.nicknames.length >= 1
            ? fetch3.nicknames.map((nick) => `**""${nick}**`).join("\n")
            : "None"
        } \n Anime's: \n ${
          fetch3.animeography.length >= 1
            ? fetch3.animeography.map((anime) => `**${anime.name}**`).join("\n")
            : "**None**"
        } \n Mangas: \n ${
          fetch3.mangaography.length >= 1
            ? fetch3.mangaography.map((manga) => `**${manga.name}**`).join("\n")
            : "**Unknown**"
        }`
      )
      .setThumbnail(fetch3.image_url)
      .setColor("RANDOM");
    const fetch4 = fetch3.about.length - 2039;
    let bioemb = new MessageEmbed()
      .setDescription(
        `Biography: **${
          fe.about.length > 2048
            ? `${fetch3.about
                .slice(0, -fdejd)
                .split("\\r")
                .join("\r")
                .split("\\n")
                .join("\n")}...`
            : fetch3.about.split("\\r").join("\r").split("\\n").join("\n")
        }**`
      )
      .setColor("RANDOM");
    e.description += `\n ${bioemb.description}`;
    e.description = require("discord.js").splitMessage(e.description)[0]
    message.reply({embed: e});
  },
};
