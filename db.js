const mongoose = require("mongoose")

const conn = () => {
    mongoose.connect(process.env.DB_URL, {
        dbName: "socialmedia",
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DataBase Successully")
    }).catch((err) => {
        console.log(`DataBase BOOOOM Amigo ----> ${err}`)
    })
}

module.exports = conn