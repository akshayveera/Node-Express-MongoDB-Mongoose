
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        taste : {
            type : String,
            enum : ["sweet", "sour", "spicy"],
            required : true       
        },
        isDrink : {
            type : Boolean,
            required : false,
            default : false
        },
        ingredients : {
            type : [String],
            dafault : []
        },
        numOfSales : {
            type : Number,
            default : 0
        }
    }
)
console.log("menuitem is executed")
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;