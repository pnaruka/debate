const jwt = require("jsonwebtoken")

const createToken = (_id,email)=>{
    //console.log(process.env.SECRET_KEY);
    return jwt.sign({_id, email}, process.env.SECRET_KEY, {expiresIn:'3d'});
};

module.exports = createToken;