const mongoose = require("mongoose");

const UserConfigSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  betaTester: {
    type: Boolean,
    default: true,
  },
});

module.exports = new mongoose.model("UserConfig", UserConfigSchema);
