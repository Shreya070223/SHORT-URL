const express=require('express');
const rout=express.Router();
const {handelUserSignup,handelUserLogin}=require('../controlar/user');

rout.post('/',handelUserSignup);
rout.post('/login',handelUserLogin);

module.exports=rout;