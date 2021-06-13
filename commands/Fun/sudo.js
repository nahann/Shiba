module.exports = {
  name: "sudo",
  description: "talk as your friends!",
  async run(bot, message, args) {
    const me = args.splice(0, 1);
    console.log(me);
    const member =
      message.guild.members.cache.find((m) => m.user.tag.includes(me)) !==
        undefined || null
        ? message.guild.members.cache.find((m) => m.user.tag.includes(me)).user
        : await bot.users.fetch(me);
    console.log(member);
    if (!member) return message.reply("That person doesn't exist!");
    const user = {
      name: member.username,
      avatar: member.displayAvatarURL({ dynamic: true, type: "png" }),
      message: args.join(" "),
    };
    user.attachments =
      message.attachments.first() !== null || undefined
        ? message.attachments.map((m) => m.url)
        : null;
    message.delete();
    const web = await message.channel.createWebhook(user.name, {
      avatar: user.avatar,
    });

    await web.send(user.message, {
      files: user.attachments,
    });
    web.delete();
  },
};
