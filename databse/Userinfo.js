const mongoose = require('mongoose')

const UserInfoSchema = new mongoose.Schema({
    userId: String,
    Bio: {
        type: String,
    },
})

module.exports = mongoose.model("UserInfo", UserInfoSchema)