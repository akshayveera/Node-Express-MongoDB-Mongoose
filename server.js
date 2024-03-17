
const express = require('express');
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());


// get
// get method is used to send the data to frontend
// or
// frontend uses get method to fetch data from backend
app.get('/', function(req, res){
    res.send("Welcome to the server");
})

app.get('/about', (req, res)=>{

    const data = {
        name : "Akshay",
        college : "LPU",
        started : 2020
    }

    res.send(data);
})


// import  routes
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

// use those routes
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);


app.listen(3000, ()=>{
    console.log("server is running on localhost port number 3000");
});