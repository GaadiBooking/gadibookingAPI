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
    const ticket = await Book.find({userid:id});
    
    if (!ticket) {
      return next(new ErrorResponse("No booking"), 404);
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
    
      await ticket.remove();
    
      res.status(200).json({
        message: "success",
        data: {},
      });
  }))

module.exports = router;