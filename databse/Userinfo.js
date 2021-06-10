const mongoose = require('mongoose')

const UserInfoSchema = new mongoose.Schema({
    userId: String,
    Bio: String,
})

module.exports = mongoose.model("UserInfo", UserInfoSchema)