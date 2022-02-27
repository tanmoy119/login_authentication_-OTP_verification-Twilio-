const express = require('express');
const mainRouter = express.Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const sendOtp = require('../middleware/sendOtp')
const verifyOtp = require('../middleware/verifyOtp');
const client = require('twilio')(process.env.ACCOUNTSID,process.env.AUTH_TOKEN);



//SignUP..
mainRouter.post('/register/sendotp', async (req, res)=>{
    try {

       const pass = req.body.pass;
       const cpass = req.body.cpass;
       if(pass === cpass){
       const adata = new user({
           name: req.body.name,
           userid: req.body.urname,
           number:req.body.number,
           email:req.body.email,
           password:req.body.password,
           
       })
       console.log(adata);
     const otpres = sendOtp(req.query.number,req.query.channel);

    


       const sdata = await adata.save();
       console.log(sdata);
       res.send(otpres);
     }
   else{
         res.send('password and conform passwor are not match.');
   }
    } catch (err) {
         console.log(err);
    }
})

mainRouter.post('/register/verifyotp', async (req, res)=>{
    try {

        client
        .verify
        .services(process.env.SERVICEID)
        .verificationChecks
        .create({
            to:`+${req.query.number}`,
            code:req.query.code
        })
        .then(async (data)=>{
            if(data.status ==="approved"){
            const number = req.query.number;
            console.log(number);
            const adata = await user.findOne({number});
            console.log(adata);
            const _id = adata._id;
     
            const updateData = await user.findByIdAndUpdate(_id, {vemail:"yes"} );
     
            const token = await adata.generateAuthToken();
            //console.log(token);
     
            res.cookie('jwt',token,{
               httpOnly:true
          });
        }

            res.status(200).send(data);
          //return data;
          
        })

      
    } catch (err) {
         console.log(err);
         res.send(err);
    }
})

//login ...

mainRouter.post('/login', async (req, res)=>{
    try {
         const email = req.body.email;
         const password = req.body.password;
         const data = await user.findOne({email});


         if (data.password === password && data.vemail === "yes" ) {
              const token = await data.generateAuthToken();
         res.cookie('jwt',token,{
             
              httpOnly:true
         });
              res.send('login successfully');
         } else {
              res.send('invalid login details')
         }

         // console.log(data.email);
         // console.log(data.password);

    } catch (err) {
         console.log(err);
         
    }
    
})

//forget ...
mainRouter.get('/forget/sendotp',  async(req, res)=>{
    try {
        const otpdata = await sendOtp(req.query.number, req.query.channel);
        res.send(otpdata);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})

mainRouter.post('/forget/verifyotp', async (req, res)=>{
    try {

        client
        .verify
        .services(process.env.SERVICEID)
        .verificationChecks
        .create({
            to:`+${req.query.number}`,
            code:req.query.code
        })
        .then(async (data)=>{
            if(data.status ==="approved"){
            const number = req.query.number;
            console.log(number);
            const adata = await user.findOne({number});
            console.log(adata);
            const _id = adata._id;
     
            const updateData = await user.findByIdAndUpdate(_id, {password:`${req.query.newpassword}`} );//set new password.
     
            const token = await adata.generateAuthToken();
            //console.log(token);
     
            res.cookie('jwt',token,{
               httpOnly:true
          });
        }

            res.status(200).send(data);
          
        })
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})

module.exports = mainRouter;