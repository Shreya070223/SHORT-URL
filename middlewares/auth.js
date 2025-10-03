// const {getUser}=require('../service/auth');
const {getUser}=require('../service/auth_jsonwebtoken');


function checkForAuthorization(req,res,next){
  // const authorizationHeaderValue=req.headers["authorization"];
  const tockenCookie=req.cookies?.tocken;
  req.user=null;
  if(!tockenCookie){
    return res.redirect("/login");
  }
  // const tocken=authorizationHeaderValue.split("Bearer ")[1];
  const tocken=tockenCookie;
  const user=getUser(tocken);
  req.user=user;
  return next();
}

function restrictTo(roles=[]){
  return function (req,res,next){
    if(!req.user ) return res.redirect("/login");
  
    if(!roles.includes(req.user.role) || req.user.role=="") return res.end("unauthorised");

    return next();
  
  };


}

// async function restrictToLoginUserOnly(req,res,next) {
//   // const userUid=req.cookies?.uid;
//   const userUid=req.headers["authorization"];
//   if(!userUid) return res.redirect("/login");
//   const tocken=userUid.split("Bearer ")[1];//Bearer [2347563793656]
//   // const user=getUser(userUid);
//   const user=getUser(tocken);
//   if(!user) return res.redirect("/login");
//   req.user=user;
//   next();
// }

// async function checkAuth(req,res,next) {
//   // const userUid=req.cookies?.uid;
//   const userUid=req.headers['authorization'];
//   console.log(req.headers);
//   const tocken=userUid.split('Bearer ')[1];
//   // const user=getUser(userUid);
//   const user=getUser(tocken);
//   req.user=user;
//   next();
// }

// module.exports={restrictToLoginUserOnly,checkAuth};
module.exports={checkForAuthorization, restrictTo};