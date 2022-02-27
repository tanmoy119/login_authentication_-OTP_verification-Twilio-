const express = require('express');
const client = require('twilio')(process.env.ACCOUNTSID, process.env.AUTH_TOKEN);

const verifyOtp =  async (req, res)=>{
    
   client
        .verify
        .services(process.env.SERVICEID)
        .verificationChecks
        .create({
            to:`+${req}`,
            code:res
        })
        .then((data)=>{
          //  res.status(200).send(data);
          return data;
          console.log(data);
        })

    }



module.exports = verifyOtp;