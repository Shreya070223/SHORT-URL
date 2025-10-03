const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
        default:"NORMAL",

    },
    passward:{
        type:String,
        require:true,
        unique:true,
    }
},{timestamps:true});

const user=mongoose.model("user",userSchema);

module.exports=user;