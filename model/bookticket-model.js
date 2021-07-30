const mongoose=require('mongoose');
const {Ticket}=require('./ticket_model')
const {User}=require('./register_model')
const Book= mongoose.model('BookTicket',
{
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