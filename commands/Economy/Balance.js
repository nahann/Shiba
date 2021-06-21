const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "balance",
  aliases: ["bal"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    const Schema = await client.db.load("userEcos");
    const data =
      (await Schema.findOne({ userId: user.id })) ||
      (await Schema.create({ userId: user.id }));
    const walletToken = data.get("walletShibaToken");
    const bankToken = data.get("bankShibaToken");
    message.reply({
      embeds: [
        client.embed(
          {
            title: `${user.username}'s wallet`,
            description: `:coin: Wallet: ${walletToken} Shiba Token\n:bank: Bank: ${bankToken} Shiba Token`,
          },
          message
        ),
      ],
    });
  },
};
