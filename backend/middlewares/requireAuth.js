const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel.js");

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers;
    //console.log(authorization);
    if(!authorization){
        return res.status(401).json({error:'Authorization token required.'})
    }

    const token = authorization.split(' ')[1];

    try{
        const {_id} = jwt.verify(token, process.env.SECRET_KEY)
        //console.log(_id);
        req.user = await UserModel.findOne({_id}).select('_id');
        next();
    }
    catch(error){
        //console.log(error);
        res.status(401).json({error: 'Unauthorized request'});
    }
}

module.exports =  requireAuth;