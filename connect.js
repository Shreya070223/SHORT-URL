const mongoos=require('mongoose');

async function connectMongoos(url) {
     
    return mongoos.connect(url);
    
}

module.exports={connectMongoos};