module.exports = {
  name: "blacklist",
  ownerOnly: true,
  run: async (client, message, args) => {
    if (isNaN(args[0])) return;
    await (await client.db.load("blacklist")).create({ user: args[0] });
    message.reply({
      embeds: [
        client.embed(
          { description: `Added ${args[0]} to the blacklist` },
          message
        ),
      ],
    });
  },
};
