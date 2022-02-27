const jwt = require('jsonwebtoken');
const user = require('../models/user');

const auth = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, "mynameistanmoybarmanfromfalakata" );

        const userData = await user.findOne({_id:verifyUser._id});

        req.token =token;
        req.userData = userData;

        next();
        
    } catch (err) {
        res.status(401).redirect('/login');
        
    }
}

module.exports = auth;