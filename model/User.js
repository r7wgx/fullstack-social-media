const { model, Schema} = require("mongoose");


const userSchema = new schema({
    username: String,
    password: String
})
