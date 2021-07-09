const mongoose=require('mongoose');

const Ticket= mongoose.model('Ticket',
{
    address:{type:String, require:true},
    time:{type:String},
    driver:{type:String},
    fare:{type:String,  require:true},
    phone:{type:String},
})

module.exports=UserDetails; 