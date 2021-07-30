const mongoose=require('mongoose');
const express=require('express');
const bodyParser =require('body-parser');

const db= require('./database/db');
const login_route=require('./route/login_route');
const ticket_route=require('./route/ticket_route');
const book_route=require('./route/bookticket_route')


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(login_route);
app.use(ticket_route);
app.use(book_route)


app.listen(3000);