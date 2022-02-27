require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


//require Routers...
const mainRouter= require("./routers/main");


//Require Models..

//require DB connection...

require('./db/conn')



app.use(express.json());
app.use(cookieParser());

//Middleware
app.use(bodyParser.json());



//Port initialization..
const port = process.env.PORT || 3000;



//Routers...
app.use(mainRouter);


//listen..

app.listen(port,()=>{
    console.log(`server listen at port ${port}`);
})



/* Post man

signup..
1.http://localhost:3000/register/sendotp?number=91YOUR MOBILE NUMBER&channel=sms
body{
    {
	
	"name":"YOUR NAME",
	"userid":"YOUR USER ID",
	"email":"YOUR EMAIL",
	"number":"91YOUR MOBILE NUMBER",
	"password":"Tanmoy1234"
	
}
}
2.http://localhost:3000/register/verifyotp?number=91YOUR MOBILE NUMBER&code=YOUR OTP

login...
1.http://localhost:3000/login

forgot..
1.http://localhost:3000/forget/sendotp?number=91YOUR MOBILE NUMBER&channel=sms
2.http://localhost:3000/forget/verifyotp?number=91YOUR MOBILE NUMBER&code=YOUR OTP&newpassword=1234



*/