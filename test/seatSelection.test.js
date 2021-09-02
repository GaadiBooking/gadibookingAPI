const seat=require('../model/seatselection_model')
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/GadiBooking';
beforeAll(async() => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async() => {
    await mongoose.connection.close();
});


describe('for the seat selection', () => {
   
    it('finding the seat detail',()=>{
        return seat.findById({_id :Object('6123552239426d1d8c2dbdec')}).then((pp)=>{
            expect(pp.a1).toEqual('Available')
            })
    })

    //update
    it('to test the update', async() => {
        return seat.findOneAndUpdate({ _id: Object('6123552239426d1d8c2dbdec') }, { $set: { a1: 'notAvailable' } })
            .then((pp) => {
                expect(pp.a1).toBe('notAvailable')
            })

    });



});
