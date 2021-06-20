module.exports = {
  name: "whitelist",
  ownerOnly: true,
  run: async (client, message, args) => {
    if (isNaN(args[0])) return;
    await (await client.db.load("blacklist")).delete({ user: args[0] });
    message.reply({
      embeds: [
        client.embed(
          { description: `Removed ${args[0]} from the blacklist` },
          message
        ),
      ],
    });
  },
};
