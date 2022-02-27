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