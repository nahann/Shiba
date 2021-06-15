const mongoose = require("mongoose");

const GuildConfigSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  guildName: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
    default: "*",
  },
});

module.exports = mongoose.model("GuildConfig", GuildConfigSchema);
