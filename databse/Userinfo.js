const mongoose = require('mongoose')

const UserInfoSchema = new mongoose.Schema({
    userId: String,
    Bio: String,
    Birthday: String,
})

module.exports = mongoose.model("UserInfo", UserInfoSchema)