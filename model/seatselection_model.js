const mongoose=require('mongoose');
const {seat}=require("./seat_model")
const Seat_selection= mongoose.model('seat_Selection',
{
    seatid:{type:String},
    seats:{type:{seat}}

})

module.exports=Seat_selection