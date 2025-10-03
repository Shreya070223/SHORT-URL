const shortid=require('short-id');
const URL=require('../model/url');

async function handleURLShort(req,res) {
    const body=req.body;
    if(!body.url) return res.status(400).json({error:'url is required'});
    const shortUrl=shortid.generate();
    await URL.create({
        shortURL:shortUrl,
        redirectURL:body.url,
        viewHistory:[],
        createdBy:req.user._id,
    })
// return res.json({id:shortUrl});
return res.render("home",{id:shortUrl});
     
}

async function handleRedirectURL(req,res) {
    const shortid=req.params.shortid;
    const entry=await URL.findOneAndUpdate({
        shortURL: shortid,
    },{
        $push:{
            viewHistory:{
                timestamp:Date.now(),
            },
        },
    });

   return res.redirect(entry.redirectURL);
    
}

async function handleAnalytics(req,res) {
    const shortid=req.params.shortid;
    const result=await URL.findOne({shortURL:shortid});
    return res.status(200).json({totalClick:result.viewHistory.length,Analytic:result.viewHistory});
    
}

module.exports={handleURLShort,handleRedirectURL,handleAnalytics};