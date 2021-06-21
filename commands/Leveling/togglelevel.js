module.exports = {
  name: "togglelevel",
  description:
    "Toggle if you want the leveling system to work in this guild or not\nIt's defaultly set to false.",
  userPermissions: "MANAGE_GUILD",
  run: async (client, message, args) => {
    const schema = await client.db.load("levelguilds");
    const doc =
      (await schema.findOne({ guild: message.guild.id })) ||
      (await schema.create({ guild: message.guild.id }));
    if (!doc.onoff)
      schema.update({ guild: message.guild.id }, { onoff: true }).then(() => {
        message.reply("Toggle set to: **ON**");
      });
    if (doc.onoff)
      schema.update({ guild: message.guild.id }, { onoff: false }).them(() => {
        return message.reply("Toggle set to: **OFF**");
      });
  },
};
