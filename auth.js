
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

// authentication
passport.use(new LocalStrategy(
    async (USERNAME, PASSWORD, done) =>{
        // authentication logic here

        try{
            // console.log("received username and passwords : ", USERNAME, PASSWORD);
            const user = await Person.findOne({username : USERNAME})    

            // if username not found
            if(!user){
                return done(null, false, {message : "username not found"});
            }

            const isPasswordMatch = await user.comparePassword(PASSWORD);

            if(isPasswordMatch)
            {
                return done(null, user);
            }
            else
            {
                return done(null, false, {message : "incorrect password"});
            }


        }
        catch(err){
            return done(err);
        }
    }
))

module.exports = passport;