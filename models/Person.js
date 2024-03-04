
const mongoose = require('mongoose');

// define person schema
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
    },
    role : {
        type : String,
        enum : ['sde', 'fed', 'bed', 'fse'],
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    }
})

console.log("person is executed");


// create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;

