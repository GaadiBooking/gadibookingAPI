const express = require('express');
const router = express.Router();
const Book = require('../model/bookticket-model');
const auth=require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

//add ticket
router.post('/book/ticket', asyncHandler(async(req,res,next)=>{
    const book =await new Book(req.body);
    book.save().then(function(){
        res.status(201).json({message:"success",data:book})
        }).catch(function(e){
        res.status(500).json({error:e})
        });
}))


module.exports = router;