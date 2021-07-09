const mongoose=require('mongoose');
const express=require('express');
const cors = require("cors")
const bodyParser =require('body-parser');

const db= require('./database/db');
const login_route=require('./route/login_route');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json());
app.use(login_route);

app.listen(90);