const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "work",
  cooldown: 1200000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const Schema = await client.db.load("userEcos");
    const data =
      (await Schema.findOne({ userId: message.author.id })) ||
      (await Schema.create({ userId: message.author.id }));
    const Jobs = [
      "cashier",
      "fast food worker",
      "janitor",
      "bartender",
      "server",
      "nurse",
      "construction worker",
      "carpenter",
      "electrician",
      "police officer",
      "truck driver",
      "lawyer",
    ];
    const job = Jobs[Math.floor(Math.random() * Jobs.length)];
    const token = Math.floor(Math.random() * 300);
    await Schema.increment(
      { userId: message.author.id },
      "walletShibaToken",
      token
    );
    return message.reply({
      embeds: [
        client.embed(
          { description: `You made \`${token}\` Shiba Token as a \`${job}\`` },
          message
        ),
      ],
    });
  },
};
