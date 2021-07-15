const { Client, Message, MessageEmbed } = require("discord.js");
const UserConfig = require("../../database/UserConfig");

module.exports = {
  name: "beta",
  ownerOnly: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.mentions.users.size) return message.reply("You need to mention someone")
    const user = message.mentions.users.first();
    const data = await UserConfig.findOne({ userId: user.id });
    if (args[0].toLowerCase() === "add") {
      if (data)
        return message.reply({
          embeds: [
            client.embed(
              { description: `This user already has beta access.` },
              message
            ),
          ],
        });
      if (!data) {
        await UserConfig.create({
          userId: user.id,
        });
        message.reply({
          embeds: [
            client.embed(
              { description: `${user.username} now has beta acccess.` },
              message
            ),
          ],
        });
      }
    }
    if (args[0].toLowerCase() === "del") {
      if (!data)
        return message.reply({
          embeds: [
            client.embed(
              { description: `This user does not have beta acccess.` },
              message
            ),
          ],
        });
      if (data) {
        await UserConfig.findOneAndDelete({ userId: user.id });
        message.reply({
          embeds: [
            client.embed(
              { description: `${user.username} no longer has beta acccess.` },
              message
            ),
          ],
        });
      }
    }
  },
};
