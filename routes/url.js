const express=require('express');
const rout=express.Router();
const {handleURLShort,handleRedirectURL,handleAnalytics}=require('../controlar/url');

rout.post('/',handleURLShort);

rout.get('/:shortid',handleRedirectURL);

rout.get('/analytics/:shortid',handleAnalytics);

module.exports=rout;