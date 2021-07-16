const express = require('express');
const router = express.Router();
const Ticket = require('../model/ticket_model');
const { check, validationResult } = require('express-validator');

//add ticket
router.post('/add/ticket',  function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const location = req.body.location;
        const driver = req.body.driver; 
        const price = req.body.price;
        const seat = req.body.seat;
        const date = req.body.date;
        const time = req.body.time;
        const phone = req.body.phone;
            const store = new Ticket({ location: location, driver: driver, price: price, seat: seat, date: date, time: time, phone: phone});
            console.log(driver);
            store.save().then(function (result) {
                res.status(200).json({ success: true, message: "Ticket Scheduled Successfully" }) 
            }).catch(function (error) {
                res.status(500).json({ err: error })
            })
    }
    else {
        res.status(201).json(errors.array());
    }
})



router.delete('/deleteticket/:id', function(req, res){
    const id = req.params.id;
    Ticket.deleteOne({_id:id}).then(function(req,res)
    {
        res.status(200).json({message:"Ticket Deleted"})
    })
    .catch(function(err)
    {
        res.status(500).json({error:err})
    })
    })
module.exports = router;