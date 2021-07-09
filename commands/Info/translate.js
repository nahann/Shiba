const translate = require("@iamtraction/google-translate")
const isoConv = require("iso-language-converter")
module.exports = {
  name: "translate",
  description: "Translate a string.",
  usage: "*translate <String>",
    run: async(client, message, args) => {
        if(!args.length){
            return message.reply({embeds: [
              client.embed({title:"Error", description: "Please provide something to translate."}, message)
            ]
        }
        const translated = await translate(args.all, {to: "en"})
        if(!translated){
            return message.reply("Error, try again in a bit.")
        } else {
            const iso = isoConv(translated.from.language.iso, {from: 1, to: 'label'})
            return message.reply({
              embeds: [client.embed({title: "Translation", description:`Input Text:\n${args.all}\n\nTranslated Text:\n${translated.text}\n\nMade with :heart: by Korabi`}, message).setFooter(`Translated From ${iso}`)]})
        }

    }
}
