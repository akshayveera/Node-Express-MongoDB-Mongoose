
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

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
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type :String,
        required : true
    }
})

personSchema.pre("save", async function(next){
    const person = this;

    // hash the password only if password has been modified or is new password
    if(!person.isModified('password')) return next();

    try{
        // generate salt
        const salt = await bcrypt.genSalt(10);

        // hashed password including salt
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // override the original password with hashed password
        person.password = hashedPassword;

        next();

    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(providedPassword){
    try{
        // use bcrypt to compare the provided password with hashed password
        const isMatch = await bcrypt.compare(providedPassword, this.password);
        return isMatch;

        // how does this comparision happen ?
        // bcrypt extracts the salt from the hashed password 
        // bcrypt attaches salt to the provided password and hashes the provided password
        // now both the hashed passwords are compared
    }catch(err){
        throw err;
    }
}

// create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;

