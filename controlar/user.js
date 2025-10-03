const {v4:uuidv4}=require('uuid');
// const {setUser}=require('../service/auth');
const {setUser}=require('../service/auth_jsonwebtoken');
const User=require('../model/user');

async function handelUserSignup(req,res) {
    const {name,email,passward}=req.body;
    await User.create({
        name,
        email,
        passward,
    });
    return res.status(200).redirect("/")
}

// async function handelUserLogin(req,res) {
//     const {email,passward}=req.body;
//     const find=await User.findOne({
//         email,
//         passward,
//     });
//     if(!find) return res.render("login",{error:"not found enter the correct user"});
//      const uid=uuidv4();
//      setUser(uid,find);
//      res.cookie("uid",uid);
//     return res.status(200).redirect("/");
// }

async function handelUserLogin(req,res) {
    const {email,passward}=req.body;
    const find=await User.findOne({
        email,
        passward,
    });
    if(!find) return res.render("login",{error:"not found enter the correct user"});
     const tocken=setUser(find);
     res.cookie("tocken",tocken);
    // return res.status(200).redirect("/");
    return res.status(200).redirect("/");
}

module.exports={handelUserSignup,handelUserLogin};