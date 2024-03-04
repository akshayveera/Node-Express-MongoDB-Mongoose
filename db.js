
// import mongoose
const mongoose = require("mongoose");

// start mongodb server and 
// define mongodb connection url
const mongoURL = "mongodb://127.0.0.1:27017/hotel";  // hotel is the name of the database in the mongodb

// set up mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

// get the default connection
// mongoose maintains a default connection object representing the mongodb connection
const db = mongoose.connection;


// event listeners

db.on('connected', ()=>{
    console.log("MongoDB server connected")
})

db.on('error', (err)=>{
    console.log("MongoDB server error ", err)
})

db.on('disconnected', ()=>{
    console.log("MongoDB server disconnected")
})

module.exports = db;



