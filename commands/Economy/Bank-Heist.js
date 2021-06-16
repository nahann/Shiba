const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "bank-heist",
  aliases: ["bank-rob", "bankrob", "bankheist"],
  cooldown: 7200000,
  beta: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const schema = await client.db.load("userEcos");
    const user = message.mentions.users.first();
    if (!user)
      return message.reply({
        embeds: [client.embed({ description: `Mention a user.` }, message)],
      });
    if (message.author.id === user.id)
      return message.reply({
        embeds: [
          client.embed({ description: `You cannot rob yourself.` }, message),
        ],
      });
    const authorData =
      (await schema.findOne({ userId: message.author.id })) ||
      (await schema.create({ userId: message.author.id }));
    const userData =
      (await schema.findOne({ userId: user.id })) ||
      (await schema.create({ userId: user.id }));
    const userToken = userData.get("bankShibaToken");
    const authorPassive = authorData.get("Passive");
    const userPassive = userData.get("Passive");
    if (userToken < 5000)
      return message.reply({
        embeds: [
          client.embed(
            {
              description: `The person you are trying to rob doesn't have at least 5000 Shiba Token in their bank.`,
            },
            message
          ),
        ],
      });
    if (authorPassive === true)
      return message.reply({
        embeds: [
          client.embed(
            {
              description: `You cannot rob someone while you are on passive mode.`,
            },
            message
          ),
        ],
      });
    if (userPassive === true)
      return message.reply({
        embeds: [
          client.embed(
            {
              description: `The user you are trying to rob is on passive mode.`,
            },
            message
          ),
        ],
      });
    const chance = Math.floor(Math.random() * 100);
    if (chance < 75) {
      const tokenCharge = Math.floor(Math.random() * (750 - 450) + 450);
      message.reply({
        embeds: [
          client.embed(
            {
              description: `You have been caught trying to rob <@${user.id}>. You had to pay them ${tokenCharge} Shiba Token`,
            },
            message
          ),
        ],
      });
      schema.decrement(
        { userId: message.author.id },
        "bankShibaToken",
        tokenCharge
      );
      return schema.increment(
        { userId: user.id },
        "bankShibaToken",
        tokenCharge
      );
    } else {
      const payout = Math.floor(Math.random() * (3000 - 1500) + 1500);
      message.reply({
        embeds: [
          client.embed(
            {
              description: `You have successfully robbed <@${user.id}>'s bank! Your payout is ${payout} Shiba Token.`,
            },
            message
          ),
        ],
      });
      schema.increment({ userId: message.author.id }, "bankShibaToken", payout);
      return schema.decrement({ userId: user.id }, "bankShibaToken", payout);
    }
  },
};
