const express = require('express');
const client = require('twilio')(process.env.ACCOUNTSID, process.env.AUTH_TOKEN);

const sendOtp = async (req,res)=>{
    
    client
    .verify
    .services(process.env.SERVICEID)
    .verifications
    .create({
        to:`+${req}`,
        channel:res
    })
    .then((data)=>{
      // res.status(200).send(data); 
      return data;
    })



    }

    
    
        


module.exports = sendOtp;