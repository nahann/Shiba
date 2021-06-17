const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "deposit",
  aliases: ["dep"],
  beta: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (isNaN(args[0]))
      return message.reply({
        embeds: [
          client.embed({ description: `Provide a real number.` }, message),
        ],
      });
    const Schema = await client.db.load("userEcos");
    const data =
      (await Schema.findOne({ userId: message.author.id })) ||
      (await Schema.create({ userId: message.author.id }));
    const walletToken = data.get("walletShibaToken");
    const bankToken = data.get("bankShibaToken");
    if (parseInt(args[0]) > walletToken)
      return message.reply({
        embeds: [
          client.embed(
            { description: `You don't have that much money in your wallet.` },
            message
          ),
        ],
      });
    Schema.increment({ userId: message.author.id }, "bankShibaToken", parseInt(args[0]));
    Schema.decrement(
      { userId: message.author.id },
      "walletShibaToken",
      parseInt(args[0])
    );
    message.reply({
      embeds: [
        client.embed(
          {
            description: `You have deposited ${args[0]} into your bank account.`,
          },
          message
        ),
      ],
    });
  },
};
