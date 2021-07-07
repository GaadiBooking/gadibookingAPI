const express = require('express');
const router = express.Router();
const Register = require('../model/register_model');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

//register user
router.post('/user/register',  function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        //valid
        const name = req.body.name;
        const email = req.body.email;
        const usrnm = req.body.usrnm;
        const pw = req.body.pw;
        const phn = req.body.phn;
        const role = req.body.role;
        bcryptjs.hash(pw, 10, function (err, hide) {
            const store = new Register({ name: name, email: email, usrnm: usrnm, pw: hide, phn: phn, role: role});
            console.log(hide);
            store.save().then(function (result) {
                res.status(200).json({ success: true, message: "User registered." }) 
            }).catch(function (error) {
                res.status(500).json({ err: error })
            })
        })

    }
    else {
        res.status(201).json(errors.array());
    }
})

//login 
router.post('/user/login', function (req, res) {
    const user = req.body.username;
    const password = req.body.password;
})
module.exports = router;
