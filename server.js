
const express = require('express');
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const passport = require("./auth");

const port = process.env.PORT || 3000 
// this means if PORT is present in env it will use that else it will use 3000

// middleware function 
// middleware functions execute between request made and response sent
const logRequest = (req, res, next)=>{
    console.log(`[${new Date().toLocaleString()}] request made to ${req.originalUrl}`)
    next();
}

const printStars = (req, res, next)=>{
    console.log("************************************************");
    next();
}

app.use(logRequest, printStars);

app.use(passport.initialize());
const localAuthMiddleware =  passport.authenticate("local", {session : false});

// get
// get method is used to send the data to frontend
// or
// frontend uses get method to fetch data from backend

app.get('/' , function(req, res){
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
app.use("/person" , personRoutes);
app.use("/menu", menuItemRoutes);


app.listen(port, ()=>{
    console.log("server is running on localhost port number", port);
});