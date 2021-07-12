const mongoose=require('mongoose');

const Ticket= mongoose.model('Ticket',
{
    location:{type:String, require:true},
    driver:{type:String, require:true},
    price:{type:String},
    seat:{type:String},
    date:{type:Date},
    time:{type:Number},
    phone:{type:String}
})

module.exports=Ticket; 