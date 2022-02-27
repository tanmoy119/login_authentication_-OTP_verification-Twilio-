const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/loginAuthDB').then(()=>{
    console.log("connection successful..");
}).catch((err)=>{
    console.log(err);
    console.log("No connection..");
})