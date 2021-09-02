const ticket=require('../model/ticket_model')
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


describe('for the ticket route', () => {
    // the code below is for insert testing
    it('Inserting the ticket', () => {
        const Ticket = {
            'departure': 'bhaktapur',
            'arrival': 'kathmandu',
            'driver':'whaterve'
        };

        return ticket.create(Ticket)
            .then((pro_ret) => {
                expect(pro_ret.departure).toEqual('bhaktapur');
            });
    });

    //update
    it('to test the update', async() => {
        return ticket.findOneAndUpdate({ _id: Object('612f5efdb8e24c148883c75a') }, { $set: { departure: 'bhaktapur' } })
            .then((pp) => {
                expect(pp.departure).toEqual('bhaktapur')
            })

    });

    it('finding the single ticket detail',()=>{
        return ticket.findById({_id :Object('612f5efdb8e24c148883c75a')}).then((pp)=>{
            expect(pp.departure).toEqual('bhaktapur')
            })
    })


    // the code below is for delete testing
    it('to test the delete ticket is working or not', async() => {
        const status = await ticket.deleteMany();
        expect(status.ok).toBe(1);
    });

})