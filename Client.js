const { Client, MessageEmbed } = require("discord.js")
const { Database } = require("zapmongo")
class ShibaClient extends Client{
  constructor(options){
    super(options)
    this.db = new Database({
  mongoURI: config.mongouri,
  schemas: [
    {
      name: "userEcos",
      data: {
        userId: String,
        walletShibaToken: {
          type: Number,
          default: 500,
        },
        bankShibaToken: {
          type: Number,
          default: 0,
        },
        Passive: {
          type: Boolean,
          default: false,
        },
      },
    },
    {
      name: "warns",
      data: {
        warns: Array,
        user: String,
        guild: String,
      },
    },
    {
      name: "blacklist",
      data: { user: String },
    },
      {
      name: "levelguilds",
      data: { guild: String, onoff: { type: Boolean, default: false } },
      },
    ],
   });
  }
}
