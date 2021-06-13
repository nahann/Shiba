const {
  APIMessage,
  Structures,
  MessageEmbed,
  User,
  GuildMember,
  Util,
} = require("discord.js");
function split(str) {
  return Util.splitMessage(str);
}
class JJMessage extends Structures.get("Message") {
  constructor(client, data, channel) {
    super(client, data, channel);
    this.send = async (...args) => {
      let embed;
      let content;
      args.map(async (value) => {
        if (value instanceof User) {
          content = `${value.toString()},`;
        } else if (value instanceof MessageEmbed || value.embeds) {
          if (value.embeds) {
            value = value.embeds;
          } else {
            if (value.description && value.description.length >= 2048) {
              const splitted = await split(value.description);
              if (!value.color) {
                if (this.author.id === "450212014912962560")
                  value.setColor("YELLOW");
                else if (this.author.id === "606138051051126794")
                  value.setColor("BLACK");
                else if (this.author.id === "423222193032396801")
                  value.setColor("#000080");
                else if (
                  this.author.id === "705843647287132200" ||
                  this.author.id === "520797108257816586"
                )
                  value.setColor("#add8e6");
                else value.setColor("#ffb946");
              }
              splitted.map((vale) =>
                this.channel.send(value.setDescription(vale))
              );
            } else embed = value;
            if (!embed.color) {
              if (this.author.id === "450212014912962560")
                embed.color = "YELLOW";
              else if (this.author.id === "606138051051126794")
                embed.color = "BLACK";
              else if (this.author.id === "423222193032396801")
                embed.color = "#000080";
              else if (
                this.author.id === "705843647287132200" ||
                this.author.id === "520797108257816586"
              )
                embed.color = "#add8e6";
              else embed.color = "#ffb946";
            }
          }
        } else {
          content = content || "";
          content += value;
        }
      });
      return this.channel.send({
        embed: embed ? embed : null,
        content: content,
      });
    };
  }
}
Structures.extend("Message", () => JJMessage);
