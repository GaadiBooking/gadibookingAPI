const mongoose=require('mongoose');

const Ticket= mongoose.model('Ticket',
{
    departure:{type:String, require:true},
    arrival:{type:String, require:true},
    driver:{type:String},
    price:{type:String},
    seat:{type:String},
    date:{type:String},
    departuretime:{type:String},
    arrivaltime:{type:String},
    phone:{type:String},
    busno:{type:String},
    driver_id:{type:String},
})

module.exports=Ticket; 