
const express = require("express");
const router = express.Router();

const Person = require("../models/Person");

// post
// post is used by backend to recieve data and update it in the db
// or
// post is used by frontend to give data to the backend

// POST route to add a person
router.post("/", async (req, res)=>{

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
router.get("/", async (req, res)=>{

    try{
        const data = await Person.find();
        console.log("data fetched by client");
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Sever Error"});
    }
})


// parameterized API calls
router.get("/:role", async (req, res)=>{

    try{
        const roleType = req.params.role;

        if(roleType == "fed" || roleType == "bed" || roleType == "sde" || roleType == "fse" )
        {
            const data = await Person.find({role : roleType});
            res.status(200).json(data);
            console.log("data fetched");
        }else{
            res.status(404).json({error : "Role not found"});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error"});
    }
})

module.exports = router;