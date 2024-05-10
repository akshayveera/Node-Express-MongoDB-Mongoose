
const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next)=>{

    // first check req headers has authorization or not 
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(401).json({error : "Token not found"});
    }

    // extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({error : "no token"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error : "Invalid Token"});
    }

}


// generate a token
const generateToken = (userData)=>{
    // generate a new token using user data
    return jwt.sign(userData, process.env.JWT_SECRET_KEY, {expiresIn : 60000});
}


module.exports = {jwtAuthMiddleware, generateToken};