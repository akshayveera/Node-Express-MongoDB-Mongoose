
const express = require('express');
const app = express();
const db = require("./db");
const Person = require("./models/Person");

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

app.get('/services', (req, res)=>{
    res.send("many services are available")
})

// post
// post is used by backend to recieve data and update it in the db
// or
// post is used by frontend to give data to the backend

// POST route to add a person
app.post("/person", async (req, res)=>{

    try{
        // assuming the request body contains the person data
        const data = req.body;

        console.log("data : -------------------------------------------", data);

        // create a new Person document using mongoose model
        const newPerson = new Person(data);

        // save the person to the database
        const response = await newPerson.save();

        console.log("recieved data saved in db");
        res.status(200).json(response);        

    }catch(err){

        console.log(err);
        res.status(500).json({error : "Internal Server Error"});
    }


})

// GET method to recieve all the persons data from db
app.get("/person", async (req, res)=>{

    try{
        const data = await Person.find();
        console.log("data fetched by client");
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Sever Error"});
    }
})


app.listen(3000, ()=>{
    console.log("server is running on localhost port number 3000");
});