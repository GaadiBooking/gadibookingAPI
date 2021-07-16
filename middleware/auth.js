const jwt=require('jsonwebtoken')
const Detail=require('../model/register_model');
const router = require('../route/login_route');


module.exports.verifyUser=function(req,res,next)
{
   //main guard checks whether user has token or not
    console.log(req.headers.authorization)
    try{
        const token=req.headers.authorization.split(" ")[1]
        const data=jwt.verify(token, 'anysecretkey');
        Detail.findOne({_id:data.userId}).then(function(userData)
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
module.exports.verifyUsAd=function(req, res, next)
{
   
}

