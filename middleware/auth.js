const jwt=require('jsonwebtoken')
const Detail=require('../model/register_model');
const router = require('../route/login_route');


module.exports.verifyUser=function(req,res,next)
{
   //main guard checks whether user has token or not
    console.log(req.headers.authorization)
    try{
       
    }
    catch(err)
    {
       
    }
}


