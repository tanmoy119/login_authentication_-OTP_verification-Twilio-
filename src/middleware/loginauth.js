const jwt = require('jsonwebtoken');
const user = require('../models/user');

const loginauth = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, "mynameistanmoybarmanfromfalakata" );
        res.redirect('/profile');
        
    } catch (err) {
        next();
        
    }
}

module.exports = loginauth;