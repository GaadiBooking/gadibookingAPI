const user=require('../model/register_model')
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


describe('registering the new user', () => {
    // the code below is for inserting the new customer testing
    it('Insert', () => {
        const customer = {
            'name': 'ken',
            'email': 'ken@gmail.com',
            'username': 'ken',
            'password': 'ken',
            'mobile_number':'38388839',

        };

        return user.create(customer)
            .then((pro_ret) => {
                expect(pro_ret.name).toEqual('ken');
            });
    });





//--------------------------Login Testing-----------------
it('Login testing using the resgitered detail', () => {
    const login = {
    'email': 'ken@gmail.com',
    'password': 'ken'
    };
    return user.findOne(login)
    .then((pro_ret) => {
    expect(pro_ret.email).toEqual('ken@gmail.com');
    });
    });


it('finding the single user detail',()=>{
    return user.findById({_id :Object('60f934df23d14f0ff40723df')}).then((pp)=>{
        expect(pp.name).toEqual('ken')
        })
})





 


});
