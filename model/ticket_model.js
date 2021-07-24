const mongoose=require('mongoose');

const Ticket= mongoose.model('Ticket',
{
    departure:{type:String, require:true},
    arrival:{type:String, require:true},
    driver:{type:String, require:true},
    price:{type:String},
    seat:{type:String},
    date:{type:Date},
    departuretime:{type:Number},
    arrivaltime:{type:Number},
    phone:{type:String},
    busno:{type:String}
})

module.exports=Ticket; 