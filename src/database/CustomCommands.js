const mongoose = require("mongoose");

const CustomCommandsSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  commandname: {
    type: String,
    required: true,
    default: [],
  },
  commandcontent: {
    type: String,
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("CC", CustomCommandsSchema);
