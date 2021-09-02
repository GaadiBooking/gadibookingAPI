const mongoose=require('mongoose');
const Seat_selection= mongoose.model('seat_Selection',
{
    busid:{type:String},
    a1:{type:String, default:"Available"},
    a2:{type:String, default:"Available"},
    a3:{type:String, default:"Available"},
    a4:{type:String, default:"Available"},
    a5:{type:String, default:"Available"},
    a6:{type:String, default:"Available"},
    a7:{type:String, default:"Available"},
    a8:{type:String, default:"Available"},
    a9:{type:String, default:"Available"},
    a10:{type:String, default:"Available"},
    a11:{type:String, default:"Available"},
    a12:{type:String, default:"Available"},
    a13:{type:String, default:"Available"},
    a14:{type:String, default:"Available"},
    a15:{type:String, default:"Available"},
    a16:{type:String, default:"Available"},
    b1:{type:String, default:"Available"},
    b2:{type:String, default:"Available"},
    b3:{type:String, default:"Available"},
    b4:{type:String, default:"Available"},
    b5:{type:String, default:"Available"},
    b6:{type:String, default:"Available"},
    b7:{type:String, default:"Available"},
    b8:{type:String, default:"Available"},
    b9:{type:String, default:"Available"},
    b10:{type:String, default:"Available"},
    b11:{type:String, default:"Available"},
    b12:{type:String, default:"Available"},
    b13:{type:String, default:"Available"},
    b14:{type:String, default:"Available"},
    b15:{type:String, default:"Available"},
    b16:{type:String, default:"Available"}

})


module.exports=Seat_selection