const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "manga",
  description: "Search for any manga",
  async run(bot, message, args) {
    if (!args.length) return;
    //makes the search.. search compatible. for example it replaces spaces with %20
    const q = encodeURIComponent(args.join(" "));
    //the string which searches the manga name so it can get the mal_id. I set it as a seperate variable so it's easier for me to console.log it and see if its searching wrongly.
    const s = `https://api.jikan.moe/v3/search/manga?q=${q}&limit=1`;
    const fetch1 = await fetch(s).then((res) => res.json());
    //the mal_id of the manga. This helps in getting more info than from a search.
    const id = fetch1.results[0].mal_id;
    const s2 = `https://api.jikan.moe/v3/manga/${id}`;
    const fetched = await fetch(s2).then((res) => res.json());
    //Checks for related Mangas. If related.Other isn't undefined,it returns an array with the title and url.
    const related =
      fetched.related.Other !== undefined
        ? [fetched.related.Other[0].title, fetched.related.Other[0].url]
        : "Unknown";
    //I know I could have done this with the variable before instead of an array but I like to make things complicated. This sends a hyperlink string for the related mangas if "related" is an array.
    const other = related[0] ? `[${related[0]}](${related[1]})` : "Unknown";
    const e = new MessageEmbed()
      .setTitle(fetched.title)
      .setURL(fetched.url)
      .setColor("RANDOM")
      .setImage(fetched.image_url)
      .setDescription(
        `${fetched.synopsis} \n **Status**: ${fetched.status}\n Query ID: ${fetched.mal_id} \n **Chapter count**: ${fetched.chapters} \n **Volume count: ${fetched.volumes} \n **Type**: ${fetched.type} \n **Rank**: ${fetched.rank} \n **Related**: ${other}`
      )
      .setTimestamp()
      .setFooter("Made thanks to MyAnimeList");
    //uses Shamil's split emged function, I probably mentioned a github link along with this. if i didn't, ping me and remind me.
    message.send(e);
  },
};
