const express = require('express');
const router = express.Router();
const Register = require('../model/register_model');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const auth=require('../middleware/auth')
const asyncHandler = require("../middleware/async");
const upload = require('../middleware/upload');


//register user
router.post('/user/register',  function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        //validation purpose
        const name = req.body.name;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const phone = req.body.phone;
        const role = req.body.role;
        bcryptjs.hash(password, 10, function (err, hide) {
            const store = new Register({ name: name, email: email, username: username, password: hide, phone: phone, role: role});
            console.log(hide);
            store.save().then(function (result) {
                res.status(200).json({ success: true, message: "Registeration sucessfull" }) 
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
    Register.findOne({ username: user }).then(function (savedData) {
        //check for both username and password
        if (savedData === null) {
            return res.status(201).json({ success: false, message: "Invalid Details" }) 
        }
        bcryptjs.compare(password, savedData.password, function (err, result) {
            if (result === false) {
                return res.status(201).json({ msg: "Invalid credentials" })
            }
            const token = jwt.sign({ custId: savedData._id }, 'anysecretkey');
            return res.status(200).json({ success: true, 
                message: "successfull authentication", 
                token: token, 
                role: savedData.role,
                data: savedData })
        })
    })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })
})




//getting single user data
router.get('/user/:id',auth.userVerify,function(req,res){
    const userID=req.params.id
    console.log(userID)

    const user=Register.findById(userID)
    .then(function(data){
        res.status(200).json({message:"success",data:data})

    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})




// getting all data of user
router.get('/users/showall',auth.userVerify ,auth.verifyUserAdmin, asyncHandler(async(req,res,next)=>{

    const users = await Register.find({});
  
    res.status(201).json({
      success: true,
      data: users,
    })
}))





//updating the profile of user
router.put('/userq/update',auth.userVerify, function(req, res) {
   
    const name = req.body.name;
    const email = req.body.email;
    const address=req.body.address;
    const password = req.body.password;
    const phone = req.body.phone;
    const id = req.body.id;
    bcryptjs.hash(password, 10, function (err, hide) {
        Register.updateOne({ _id: id }, { name: name, email: email, address: address, password: hide, phone: phone })
        .then(function(re) {
            console.log(re)
            res.status(200).json({ message: "updated profile" })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })
    })

    //updating the profile of user
router.put('/userr/profile/image/:id',upload.single('dp'),auth.userVerify, function(req, res) {
    console.log(req.file)
    if (req.file == undefined) {
        return res.status(400).json({
            message: "Invalid file format"
        })
    }
    const dp = req.body.dp;
    const path    = req.file.path;
    const id = req.params.id;
    console.log(id)
    console.log(path)

        // console.log(hash)
        Register.updateOne({ _id: id }, { dp:path })
        .then(function(re) {
            console.log(re)
            res.status(200).json({ message: "updated Image" })
        })
        .catch(function(e) {
            res.status(500).json({ error: e })
        })

   
})

   
})




module.exports = router;
