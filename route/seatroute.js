const express = require('express');
const router = express.Router();
const Seat = require('../model/seatselection_model');
const auth=require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { response } = require('express');

router.get("/show/seats/:id",auth.userVerify, asyncHandler(async(req,res,next)=>{
    const id=req.params.id
    console.log(id)
    const ticket = await Seat.findOne({busid:id});
    
    
    if (!ticket) {
      return next(new ErrorResponse("No booking"), 404);
    }
  
    res.status(200).json({
      message: "success",
      data: ticket,
    });
  }))

  router.post('/post/seat', asyncHandler(async(req,res,next)=>{
      console.log("seat")
    const bseat =await Seat.create(req.body);
    if (!bseat) {
        return next(new ErrorResponse("Error inseting ticket"), 404);
      }
        res.status(200).json({
            message: "success",
            data: bseat,
          });
}))

router.put('/update/seat/:id',(req,res,next)=>{
const a1=req.body.a1
const a2=req.body.a2
const a3=req.body.a3
const a4=req.body.a4
const a5=req.body.a5
const a6=req.body.a6
const a7=req.body.a7
const a8=req.body.a8
const a9=req.body.a9
const a10=req.body.a10
const a11=req.body.a11
const a12=req.body.a12
const a13=req.body.a13
const a14=req.body.a14
const a15=req.body.a15
const a16=req.body.a16
const b1=req.body.b1
const b2=req.body.b2
const b3=req.body.b3
const b4=req.body.b4
const b5=req.body.b5
const b6=req.body.b6
const b7=req.body.b7
const b8=req.body.b8
const b9=req.body.b9
const b10=req.body.b10
const b11=req.body.b11
const b12=req.body.b12
const b13=req.body.b13
const b14=req.body.b14
const b15=req.body.b15
const b16=req.body.b16
const id=req.params.id
console.log(id)

Seat.updateOne({ busid: id }, { a1:a1, a2:a2 ,a3:a3,a4:a4, a5:a5 ,a6:a6,a7:a7, a8:a8 ,a9:a9,a10:a10, a11:a11 ,a12:a12,a13:a13, a14:a14 ,a15:a15,a16:a16,
  b1:b1, b2:b2 ,b3:b3,b4:b4, b5:b5 ,b6:b6,b7:b7, b8:b8 ,b9:b9,b10:b10, b11:b11 ,b12:b12,b13:b13, b14:b14 ,b15:b15,b16:b16,})
  .then(function(re) {
      console.log(re)
      res.status(200).json({ message: "success" })
  })
  .catch(function(e) {
      res.status(500).json({ error: e })
  })

})


//delete seat
router.delete('/delete/seat/:id', function(req, res){
  const id = req.params.id;
  Seat.deleteOne({busid:id}).then(function(ticketdel)
  {
      res.status(200).json({message:"success"})
  })
  .catch(function(err)
  {
      res.status(500).json({message:"problem"})
  })
  })



  module.exports = router;