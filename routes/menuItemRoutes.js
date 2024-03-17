
const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// post methos for menu
router.post("/", async (req, res)=>{    
    try{
        const data = req.body;

        const newMenuItem = new MenuItem(data);

        const response = await newMenuItem.save();

        console.log("data saved");
        res.status(200).json(response);

    }catch(err){

        console.log(err);
        res.status(500).json({error : "Internal Server Error"});

    }
})

// get method for menu
router.get("/", async (req, res)=>{

    try{
        const data = await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error"});
    }
})

router.get("/:taste", async (req, res)=>{

    try{
        const tasteType = req.params.taste;

        if(tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy")
        {
            const data = await MenuItem.find({taste : tasteType});
            console.log("data fetched");
            res.status(200).json(data);
        }else{
            res.status(404).json({error : "Not found error"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error"});
    }
})

router.put("/:id", async (req, res)=>{
    try{
        const menuItemId = req.params.id;
        const dataToUpdate = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuItemId, dataToUpdate, {
            new : true,
            runValidators : true
        })

        if(!response){
            return res.status(404).json({error : "MenuItem not found error"});
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
        const menuItemId = req.params.id;
        
        const response = await MenuItem.findByIdAndDelete(menuItemId);

        if(!response)
        {
            return res.status(404).json({error : "Menu Item not found"});
        }

        console.log("data deleted");
        res.status(200).json({meassage : "MenuItem deleted"});
    }catch(err){
        console.log(err);
        res.status(500).jsoon({error : "Internal Server Error"});
    }
})


module.exports = router;