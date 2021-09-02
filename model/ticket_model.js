const mongoose=require('mongoose');

const Ticket= mongoose.model('Ticket',
{
    route:{type:String, require:true},
    driver:{type:String},
    seat:{type:String, default:"32"},
    date:{type:String},
    departuretime:{type:String},
    arrivaltime:{type:String},
    phone:{type:String},
    busno:{type:String},
    driver_id:{type:String},
})

module.exports=Ticket; 