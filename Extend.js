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
  async reply(content, options) {
    const mentionRepliedUser =
      typeof ((options || content || {}).allowedMentions || {}).repliedUser ===
      "undefined"
        ? true
        : (options || content).allowedMentions.repliedUser;
    delete ((options || content || {}).allowedMentions || {}).repliedUser;

    const apiMessage =
      content instanceof APIMessage
        ? content.resolveData()
        : APIMessage.create(this.channel, content, options).resolveData();
    Object.assign(apiMessage.data, {
      message_reference: { message_id: this.id },
    });

    if (
      !apiMessage.data.allowed_mentions ||
      Object.keys(apiMessage.data.allowed_mentions).length === 0
    )
      apiMessage.data.allowed_mentions = {
        parse: ["users", "roles", "everyone"],
      };
    if (typeof apiMessage.data.allowed_mentions.replied_user === "undefined")
      Object.assign(apiMessage.data.allowed_mentions, {
        replied_user: mentionRepliedUser,
      });

    if (Array.isArray(apiMessage.data.content)) {
      return Promise.all(
        apiMessage
          .split()
          .map((x) => {
            x.data.allowed_mentions = apiMessage.data.allowed_mentions;
            return x;
          })
          .map(this.inlineReply.bind(this))
      );
    }

    const { data, files } = await apiMessage.resolveFiles();
    return this.client.api.channels[this.channel.id].messages
      .post({ data, files })
      .then((d) => this.client.actions.MessageCreate.handle(d).message);
  }
  async send(content) {
    return this.reply(content);
  }
}
class YesMember extends GuildMember {
  constructor(client, data, guild) {
    super(client, data, guild);
    this.avatar = this.user.displayAvatarURL({ type: "png", dynamic: true });
  }
}

Structures.extend("Message", () => JJMessage);
Structures.extend("GuildMember", () => YesMember);