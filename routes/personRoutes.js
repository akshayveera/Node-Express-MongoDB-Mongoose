
const express = require("express");
const router = express.Router();

const Person = require("../models/Person");
const {jwtAuthMiddleware, generateToken} = require("../jwt");

// post
// post is used by backend to recieve data and update it in the db
// or
// post is used by frontend to give data to the backend

// POST route to add a person
router.post("/signup", async (req, res)=>{

    try{
        // assuming the request body contains the person data
        const data = req.body;

        // console.log("data : -------------------------------------------", data);

        // create a new Person document using mongoose model
        const newPerson = new Person(data);        
        
        // save the person to the database
        const response = await newPerson.save();

        // generating the token
        const payload = {
            id : response.id,
            username : response.username
        }

        const token = generateToken(payload);
        console.log("Token is : ", token);
        
        // console.log("received data saved in db");
        res.status(200).json({response : response, token : token});        

    }catch(err){

        console.log(err);
        res.status(500).json({error : "Internal Server Error"});
    }
})

// login
router.post("/login", async(req, res)=>{
    try{
        // extract username and password
        const {username, password} = req.body;

        // find the user by username
        const user = await Person.findOne({username : username});

        // check of the user exist and compare password
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error : "Invalid username and password"});
        }

        // generate token
        const payload = {
            id : user.id,
            username : user.username
        }

        const token = generateToken(payload);

        res.json({token : token});

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"});
    }
})


// GET method to recieve all the persons data from db
router.get("/", jwtAuthMiddleware, async (req, res)=>{

    try{
        const data = await Person.find();
        console.log("data fetched by client");
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Sever Error"});
    } 
})

// profile of person
router.get("/profile", jwtAuthMiddleware, async (req, res)=>{

    try{
        const userData = req.user;

        const userID = userData.id;
        const user = await Person.findById(userID);

        res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Intenal server error"})
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

router.put("/:id", async (req, res)=>{

    try{
        const personId = req.params.id;
        const dataToUpdate = req.body;
        const response = await Person.findByIdAndUpdate(personId, dataToUpdate, {
            new : true,
            runValidators : true
        } )

        if(!response){
            console.log("not found error");
            return res.status(404).json({error : "Person not found error"});
        }

        console.log("data updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error"})
    }
})

router.delete("/:id", async (req, res)=>{

    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error : "Person not found error"})
        }
        
        console.log("data deleted");
        res.status(200).json({message : "Person deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error"});
    }
})

module.exports = router;