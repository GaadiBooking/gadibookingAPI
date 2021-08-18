const mongoose=require('mongoose');

const Seat= mongoose.model('Seats',
{
    a1:{type:Boolean},
    a2:{type:Boolean},
    a3:{type:Boolean},
    a4:{type:Boolean},
    a5:{type:Boolean},
    a6:{type:Boolean},
    a7:{type:Boolean},
    a8:{type:Boolean},
    a9:{type:Boolean},
    a10:{type:Boolean},
    a11:{type:Boolean},
    a12:{type:Boolean},
    a13:{type:Boolean},
    a14:{type:Boolean},
    a15:{type:Boolean},
    a16:{type:Boolean},
    b1:{type:Boolean},
    b2:{type:Boolean},
    b3:{type:Boolean},
    b4:{type:Boolean},
    b5:{type:Boolean},
    b6:{type:Boolean},
    b7:{type:Boolean},
    b8:{type:Boolean},
    b9:{type:Boolean},
    b10:{type:Boolean},
    b11:{type:Boolean},
    b12:{type:Boolean},
    b13:{type:Boolean},
    b14:{type:Boolean},
    b15:{type:Boolean},
    b16:{type:Boolean}
})

module.exports=Seat