
// import mongoose
const mongoose = require("mongoose");

require("dotenv").config();

// start mongodb server and 
// define mongodb connection url

// this is the local db
const mongoURL = process.env.MONGODB_LOCAL_URL;  // hotel is the name of the database in the mongodb
// this is the hosted db on mongodb altas
// const mongoURL = process.env.MONGODB_HOSTED_URL;

// set up mongodb connection
mongoose.connect(mongoURL);
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }

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



