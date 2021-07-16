const express = require('express');
const router = express.Router();
const Ticket = require('../model/ticket_model');
const { check, validationResult } = require('express-validator');

//add ticket
router.post('/add/ticket',  function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const departure = req.body.departure;
        const arrival = req.body.arrival;
        const driver = req.body.driver;
        const price = req.body.price;
        const seat = req.body.seat;
        const date = req.body.date;
        const departuretime = req.body.departuretime;
        const arrivaltime=req.body.arrivaltime;
        const phone = req.body.phone;
        const busno=req.body.busno
            const store = new Ticket({ departure: departure,arrival:arrival, driver: driver, price: price, seat: seat, date: date, departuretime: departuretime,arrivaltime:arrivaltime, phone: phone,busno:busno});
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



//updating the ticket details
router.put('/update/ticket', function(req, res) {
   
        const departure = req.body.departure;
        const arrival = req.body.arrival;
        const driver = req.body.driver;
        const price = req.body.price;
        const seat = req.body.seat;
        const date = req.body.date;
        const departuretime = req.body.departuretime;
        const arrivaltime=req.body.arrivaltime;
        const phone = req.body.phone;
        const busno=req.body.busno
        const id = req.body.id;
    Ticket.updateOne({ _id: id }, { departure: departure,arrival:arrival, driver: driver, price: price, seat: seat, date: date, departuretime: departuretime,arrivaltime:arrivaltime, phone: phone,busno:busno })
        .then(function(re) {
            console.log(re)
            res.status(200).json({ message: "updated" })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
   
})


router.delete('/delete/ticket/:id', function(req, res){
    const id = req.params.id;
    Ticket.deleteOne({_id:id}).then(function(ticketdel)
    {
        res.status(200).json({message:"Ticket Deleted"})
    })
    .catch(function(err)
    {
        res.status(500).json({message:"problem"})
    })
    })

module.exports = router;