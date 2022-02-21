//require express 
const express = require('express');
//require path 
const path = require('path')
require('dotenv').config();
//create port variable
const PORT = process.env.PORT || 6060;

//initialize express app
const app = express();

//serve static files 
app.use(express.static(path.join(__dirname + '/src')));


//routing for post and get data
app.get("/questions", (req, res) => {
    res.sendFile(path.join(__dirname + "/src/index.html"))
});
app.post("/questions", (req, res) => {
    console.log(req.body)
});
//listen to port 
app.listen(PORT, () => console.log(`Application is served on PORT ${PORT}.`))