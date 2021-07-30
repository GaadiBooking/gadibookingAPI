const express = require('express');
const router = express.Router();
const Book = require('../model/bookticket-model');
const auth=require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

//add ticket
router.post('/book/ticket', asyncHandler(async(req,res,next)=>{
    const book =await Book.create(req.body);
    if (!book) {
        return next(new ErrorResponse("Error booking ticket"), 404);
      }
        res.status(200).json({
            message: "success",
            data: book,
          });
}))


module.exports = router;