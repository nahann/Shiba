const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  userId: String,
  Bio: {
    type: String,
    default: "Bio Not Set",
  },
  Color: {
    type: String,
    default: "RANDOM",
  },
  Bday: {
    type: String,
    default: "Not Yet Set",
  },
});

module.exports = mongoose.model("UserInfo", UserInfoSchema);
