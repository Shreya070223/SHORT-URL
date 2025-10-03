const jwt=require('jsonwebtoken');
const secret="Anku@0987";

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email, 
        role: user.role,
    },secret);
}

function getUser(tocken){
    if(!tocken) return null;
    try{
        return jwt.verify(tocken,secret);
    }catch{
        return null;
    }
    
}

module.exports={setUser,getUser};