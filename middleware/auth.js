const jwt=require('jsonwebtoken')
const Detail=require('../model/register_model');
const router = require('../route/login_route');


module.exports.userVerify=function(req,res,next)
{
   //main guard checks whether user has token or not
    console.log(req.headers.authorization)
    try{
        const token=req.headers.authorization.split(" ")[1]
        const data=jwt.verify(token, 'anysecretkey');
        Detail.findOne({_id:data.custId}).then(function(userData)
        {
            req.validUser=userData;
            console.log(userData) 
            next();
        })
        .catch(function(err){
            res.status(401).json({error:err})
        })
    }
    catch(err)
    {
        res.status(401).json({error:err})
    }
}

//admin auth for ticket udpates/addition/deletion
module.exports.verifyAdmin=function(req, res, next)
{
    if(!req.validUser)
    {
        return res.status(401).json({msg: "eta prb"})
    }
    else if(req.validUser.role!=="Admin")
    {
        return res.status(401).json({msg: "Unauthorized"})
    }
    next();
}

