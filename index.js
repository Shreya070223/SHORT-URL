const express=require('express');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');
// const {restrictToLoginUserOnly,checkAuth}=require('./middlewares/auth');
const {checkForAuthorization,restrictTo}=require('./middlewares/auth');
const urlRout=require('./routes/url');
const staticRouter=require('./routes/staticRouter');
const userRout=require('./routes/user');
const {connectMongoos}=require('./connect');
const port=8001;

connectMongoos("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("mongodb get connected"));

app.set('view engine',"ejs");
app.set('views',path.resolve("./view"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthorization);

app.use('/url',restrictTo(["NORMAL","ADMIN"]),urlRout);
app.use('/',checkForAuthorization,staticRouter);
app.use('/user',userRout);

app.listen(port,()=>console.log(`started at ${port} port`));