const mongoose=require('mongoose');
const {Ticket}=require('./ticket_model')
const {User}=require('./register_model')
const Book= mongoose.model('BookTicket',
{
    departure:{type:String, require:true},
    arrival:{type:String, require:true},
    price:{type:String},
    seat:{type:String},
    date:{type:String},
    userid:{
        type:String
    },
    ticket:{
        type:{Ticket},
    },
    expireIn:{
        type:Number
    }
})

module.exports=Book; 