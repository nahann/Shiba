const [first, last] = [
  require("../../arrays/firstnames"),
  require("../../arrays/lastNames"),
];
module.exports = {
  name: "name",
  description: "Get a random name",
<<<<<<< HEAD
  run: async (client, message, args) => {
    message.channel.startTyping();
    const randomise = (arr) => {
      return arr[Math.floor(Math.random() * arr.length)];
    };
    const name = `${randomise(first)} ${randomise(last)}`;
    setTimeout(
      () => message.reply({ content: `The name is:\n${name}`, code: true }),
      1000
    );
    message.channel.stopTyping();
  },
};
=======
  run: async(client,message,args)=>{
    message.channel.startTyping()
    const randomise = (arr) =>{ return arr[Math.floor(Math.random() * arr.length)]}
    const name = `${randomise(first)} ${randomise(last)}`
    setTimeout(() => message.reply({ embeds: [client.embed({ description: `The name is: ${name}`}, message)]}), 1000)
    message.channel.stopTyping()
  }
}
>>>>>>> d53ddbac955a25c5be1419b9e8a55393a39e0aff
