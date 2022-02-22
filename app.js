//require express 
const express = require('express');
//require path 
const path = require('path');
const { db } = require("./db/db")
const questionDataModel = require("./db/data_model")
require('dotenv').config();
//create port variable
const PORT = process.env.PORT || 6060;
//initialize express app
const app = express();
//connect database
db();
//serve static files 
app.use(express.static(path.join(__dirname + '/src')));
//use express body parser
app.use(express.json());


//routing for post and get data
app.get("/questions", (req, res) => {
    res.sendFile(path.join(__dirname + "/src/index.html"))
});
app.post("/questions", async(req, res) => {
    try {
        const newData = await questionDataModel.create(req.body);
        if (newData) return res.json({ message: "Submitted Successfully!", status: 200 })
    } catch (error) {
        res.json({ message: error.message, status: 500 });
    }

});
//listen to port 
app.listen(PORT, () => console.log(`Application is served on PORT ${PORT}.`))