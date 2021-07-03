const fetch = require("node-fetch");
const { MessageAttachment, MessageActionRow, MessageButton } = require("discord.js");
const sharp = require("sharp");
module.exports = {
  name: "countryinfo",
  description: "Get any country's info",
  args: true,
  aliases: ["country"],
  run: async (client, message, args) => {
    const url = `https://restcountries.eu/rest/v2/name/${args.join(" ")}`;
    try {
      let i = 0;
      const fetched = await fetch(url).then((res) => res.json());
      if (!fetched.length) return message.reply("That country does not exist!");
      const max = fetched.length >= 5 ? 5 : fetched.length
      let result;
      if(fetched.length == 1) result = fetched[0]
      if(!result){
      const results = await fetched
          .slice(0, max)
          .map((country) => { i++; return`**${i}** ${country.name} `})
          .join("\n");
        const b1 = new MessageButton().setLabel('1️⃣').setCustomID("b1").setStyle("PRIMARY")
        const b2 = new MessageButton().setLabel('2️⃣').setCustomID("b2").setStyle("SECONDARY")
        const b3 = new MessageButton().setLabel('3️⃣').setCustomID("b3").setStyle("SUCCESS")
        const b4 = new MessageButton().setLabel('4️⃣').setCustomID("b4").setStyle("DANGER")
        const b5 = new MessageButton().setLabel('5️⃣').setCustomID("b5").setStyle("PRIMARY")
        const buttonarr = [b1,b2,b3,b4,b5].slice(0,max)
        const row = new MessageActionRow().addComponents(buttonarr)

        const msg = await message.reply({
          embeds: [client.embed({ description: results }, message)],
          components: [row]
        })


        let number

        try {
          const filter = (interaction) => interaction.user.id === message.author.id;

          await msg.awaitMessageComponentInteraction(filter, { max: 1, time: 100000, errors: ['time'] })
            .then(async(collected)=>{
              const interaction = await collected
              interaction.reply({ content: "Search done!", ephemeral: true})
              if (interaction.customID === 'b1') {
                number = '0'
              } else if (interaction.customID === 'b2') {
                number = '1'
              } else if (interaction.customID === 'b3') {
                number = '2'
              } else if (interaction.customID === 'b4') {
                number = '3'
              } else if (interaction.customID === 'b5') {
                number = '4'
              }
            })
        } catch (e) { console.error(e) } 
       result = fetched[number]
     }
      const fl1 = await sharp(
        await fetch(result.flag).then((file) => file.buffer())
      )
        .png()
        .toBuffer();
      const flag = new MessageAttachment(fl1, "flag.png");
      message.reply({
        embeds: [
          client
            .embed({ title: `Info for ${result.name}` }, message)
            .addField(
              "Top Level Domain(s)",
              result.topLevelDomain?.join(", ") || "None",
              true
            )
            .addField("Capital", result.capital, true)
            .addField(
              "Alternate Names",
              result.altSpellings?.join(", ") || "None"
            )
            .addField("Continent", result.region, true)
            .addField("Subregion", result.subregion, true)
            .addField("Population", result.population.toString().replace(/(.)(?=(\d{3})+$)/g,'$1,'), true)
            .addField("Demonym", result.demonym, true)
            .addField("Native Name", result.nativeName, true)
            .addField(
              "Currencies",
              result.currencies
                .map((c) => `(${c.symbol}) ${c.name}`)
                .join(", "),
              true
            )
            .addField(
              "Languages",
              result.languages.map((l) => l.name).join(", "),
              true
            )
            .setThumbnail("attachment://flag.png"),
        ],
        files: [flag],
      });
    } catch (e) {
      client.emit("error",e)
    }
  },
};
