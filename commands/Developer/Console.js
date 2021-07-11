const { Client, Message, MessageEmbed } = require("discord.js");
const { exec } = require("child_process");

module.exports = {
  name: "console",
  description: `Executes stuff in the console.`,
  ownerOnly: true,
  category: `Developer`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    exec(`cd /root/Shiba && ${args.join(" ")}`, (error, stdout) => {
      const response = error || stdout;
      try {
        message.reply({ content: `\`\`\`sh\n${response}\`\`\``,split: true});
      } catch {
        message.reply({
          embeds: [
            client.embed({ description: `An error has occured` }, message),
          ],
        });
      }
    });
  },
};
