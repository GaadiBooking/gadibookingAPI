const express = require('express');
const router = express.Router();
const Book = require('../model/bookticket-model');
const auth=require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

//add ticket
router.post('/book/ticket',auth.userVerify, asyncHandler(async(req,res,next)=>{
    const book =await Book.create(req.body);
    if (!book) {
        return next(new ErrorResponse("Error booking ticket"), 404);
      }
        res.status(200).json({
            message: "success",
            data: book,
          });
}))


router.get("/show/bookticket/:id",auth.userVerify, asyncHandler(async(req,res,next)=>{
    const id=req.params.id
    let date_ob = new Date();

    let date = (date_ob.getDate());
    let date1=date+1
   
    let month = ((date_ob.getMonth() + 1));
    
    let year = date_ob.getFullYear();

    let currentTime=date + "/" + month + "/" + year
    console.log(currentTime)
    let tomorrow=date1 + "/" + month + "/" + year

    const ticket = await Book.find({userid:id,$or:[ {date:currentTime}, {date:tomorrow}]});
    
    if (!ticket) {
      return next(new ErrorResponse("No booking"), 404);
    }
    let diff=ticket.expireIn-currentTime
    if(diff < 0){
      return res.status(201).json({message:"No Booking"})
    }

    res.status(200).json({
      message: "success",
      data: ticket,
    });
  }))


  router.get("/show/pastbook/:id",auth.userVerify, asyncHandler(async(req,res,next)=>{
    const id=req.params.id
    let date_ob = new Date();

    let date = (date_ob.getDate());
    let date1=date+1
   
    let month = ((date_ob.getMonth() + 1));
    
    let year = date_ob.getFullYear();

    let currentTime=date + "/" + month + "/" + year
    console.log(currentTime)
    let tomorrow=date1 + "/" + month + "/" + year
    const ticket = await Book.find({userid:id,date:{'$ne':currentTime ||tomorrow}});
    
    if (!ticket) {
      return next(new ErrorResponse("No Past booking"), 404);
    }
    res.status(200).json({
      message: "success",
      data: ticket,
    });
  }))



  router.get("/coupon/:id",asyncHandler(async(req,res,next)=>{
    const ticket = await Book.findById(req.params.id);
    console.log(ticket)
    
    if (!ticket) {
      return next(new ErrorResponse("Ticket not found"), 404);
    }
  
    res.status(200).json({
      message: "success",
      data: ticket,
    });
  }))

  //deleting code

  router.delete("/remove/booking/:id",auth.userVerify, asyncHandler(async(req,res,next)=>{

    const ticket = await Book.findById(req.params.id);
    
      if (!ticket) {
        return next(new ErrorResponse(`No post found `), 404);
      }

      let date_ob = new Date();

      let date = (date_ob.getDate());
      let date1=date+1
     
      let month = ((date_ob.getMonth() + 1));
      
      let year = date_ob.getFullYear();
  
      let currentTime=date + "/" + month + "/" + year

      let time=parseInt( ticket.ticket.departuretime)
      console.log(time)
      
      let hours = new Date().getHours();
      console.log(hours)
      let diff=hours+3
      if(diff>time && ticket.date===currentTime){
        return res.status(201).json({message:"Sorry could not cancel the reservation"})
      }
    
      await ticket.remove();

      console.log(ticket)
    
      res.status(200).json({
        message: "success",
        data: ticket,
      });
  }))

  router.delete("/remove/pastbooking/:id",auth.userVerify, asyncHandler(async(req,res,next)=>{

    const ticket = await Book.findById(req.params.id);
    
      if (!ticket) {
        return next(new ErrorResponse(`No post found `), 404);
      } 
      await ticket.remove();
    
      res.status(200).json({
        message: "success",
        data: {},
      });
  }))

  //delete seat
router.delete('/delete/bydriver/:id', function(req, res){
  const id = req.params.id;
  Book.deleteMany({ticketid:id}).then(function(ticketdel)
  {
      res.status(200).json({message:"success"})
  })
  .catch(function(err)
  {
      res.status(500).json({message:"problem"})
  })
  })

  

module.exports = router;