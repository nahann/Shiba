const mongoose = require("mongoose");

const WelcomeSchema = new mongoose.Schema({
  guildId: String,
  channelId: String,
  message: {
    type: String,
    default: "Welcome {user} to {guild}!",
  },
  roleId: String,
  toggled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("WelcomeConfig", WelcomeSchema);
