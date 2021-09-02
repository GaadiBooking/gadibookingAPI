const express = require('express');
const router = express.Router();
const Ticket = require('../model/ticket_model');
const auth=require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

//add ticket
router.post('/add/ticket',auth.userVerify,auth.verifyAdmin,  function (req, res) {
    const errors = validationResult(req);
    console.log("requested")
    if (errors.isEmpty()) {
        const route = req.body.route;
        const driver = req.body.driver;
        const date = req.body.date;
        const departuretime = req.body.departuretime;
        const arrivaltime=req.body.arrivaltime;
        const phone = req.body.phone;
        const busno=req.body.busno
        const driver_id=req.body.driver_id
            const store = new Ticket({ route: route, driver: driver, date: date,driver_id:driver_id, departuretime: departuretime,arrivaltime:arrivaltime, phone: phone,busno:busno});
            store.save().then(function (result) {
                console.log(result)
                res.status(200).json({ success: true, message: "Ticket Scheduled Successfully",data:result }) 
            }).catch(function (error) {
                res.status(500).json({ err: error })
            })
    }
    else {
        res.status(201).json(errors.array());
    }
})



//updating the ticket details
router.put('/update/ticket/:id',auth.userVerify,auth.verifyAdmin, function(req, res) {
        const route = req.body.route;
        const date = req.body.date;
        const departuretime = req.body.departuretime;
        const arrivaltime=req.body.arrivaltime;
        const phone = req.body.phone;
        const busno=req.body.busno
        const id = req.params.id;
        const driver_id=req.body.driver_id
        Ticket.updateOne({ _id: id }, { route: route, date: date, departuretime: departuretime,arrivaltime:arrivaltime, phone: phone,busno:busno,driver_id:driver_id })
            .then(function(re) {
              res.status(200).json({ message: "updated" })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
   
})
//get ticket of loged in driver
router.get("/myticket/:id",auth.userVerify, asyncHandler(async(req,res,next)=>{
    const id=req.params.id
    const ticket =  await Ticket.find({driver_id:id});
    
    if (!ticket) {
      return next(new ErrorResponse("Ticket not found"), 404);
    }
  
    res.status(200).json({
      message: "success",
      data: ticket,
    });
  }))

  //get active ticket of loged in driver
router.get("/myactiveticket/:id",auth.userVerify, asyncHandler(async(req,res,next)=>{
  const id=req.params.id
  let date_ob = new Date();

    let date = (date_ob.getDate());
    let date1=date+1
  
    let month = ((date_ob.getMonth() + 1));
    
    let year = date_ob.getFullYear();

    let currentTime=date + "/" + month + "/" + year
    
    let tomorrow=date1 + "/" + month + "/" + year

  const ticket =  await Ticket.find({driver_id:id,$or:[ {date:currentTime}, {date:tomorrow}]});
  
  if (!ticket) {
    return next(new ErrorResponse("Ticket not found"), 404);
  }

  res.status(200).json({
    message: "success",
    data: ticket,
  });
}))

//fetches single ticket
  router.get("/getTicket/:id",auth.userVerify, asyncHandler(async(req,res,next)=>{
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return next(new ErrorResponse("Ticket not found"), 404);
    }
  
    res.status(200).json({
      message: "success",
      data: ticket,
    });
  }))

//delete ticket
    router.delete("/delete/ticket/:id",auth.userVerify, auth.verifyAdmin, asyncHandler(async(req,res,next)=>{

        const ticket = await Ticket.findById(req.params.id);
        
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
       
          
          let hours = new Date().getHours();
          
          let diff=hours+3
          if(diff>time && ticket.date===currentTime){
            return res.status(201).json({message:"Sorry could not cancel the ticket"})
          }
        
          await ticket.remove();
    
          
        
          res.status(200).json({
            message: "success",
            data: ticket,
          });
      }))
    

  
//display all tickets for both admin and customers
router.get("/show/tickets/",auth.userVerify, asyncHandler(async(req,res,next)=>{

    let date_ob = new Date();

    let date = (date_ob.getDate());
    let date1=date+1
   
    let month = ((date_ob.getMonth() + 1));
    
    let year = date_ob.getFullYear();

    let currentTime=date + "/" + month + "/" + year
    console.log(currentTime)
    let tomorrow=date1 + "/" + month + "/" + year
    console.log(tomorrow)

    const ticket = await Ticket.find({$or:[ {date:currentTime}, {date:tomorrow}]});
    console.log(ticket)
    
    if (!ticket) {
      return next(new ErrorResponse("No booking"), 404);
    }


    res.status(200).json({
      message: "true",
      data: ticket,
    });
  }))

module.exports = router;