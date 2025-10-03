const express=require('express');
const rout=express.Router();
const {restrictTo}=require("../middlewares/auth");
const URL=require('../model/url');

rout.get('/admin/urls',restrictTo(['ADMIN']),async (req,res)=>{
    const allUrl =await URL.find({});
    return res.render('home',{
        urls:allUrl,
    });
});

rout.get('/',restrictTo(['NORMAL','ADMIN']),async (req,res)=>{
    const allUrl =await URL.find({createdBy:req.user._id});
    return res.render('home',{
        urls:allUrl,
    });
});

rout.get('/signup',async (req,res)=>{
 return res.render("signup");
});

rout.get('/login',async (req,res)=>{
    return res.render("login");
   });

module.exports=rout;