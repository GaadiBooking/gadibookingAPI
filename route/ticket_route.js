const express = require('express');
const router = express.Router();
const Ticket = require('../model/ticket_model');

//add ticket
router.post('/add/ticket',  function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
       
    }
    else {
        res.status(201).json(errors.array());
    }
})

module.exports = router;