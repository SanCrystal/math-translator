//require env vars
require("dotenv").config();
//require mongoose
const mongoose = require("mongoose");
//set up db
module.exports.db = async() => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI, (error) => {
            if (error) return console.log(error.message);
            console.log("Database Connection Successful")
        })
    } catch (error) {
        console.log(error.message);
    }

}