const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema= new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    userid:{
        type:String
    },
    name:{
        type:String
    },
    number:{
        type:Number
    },
    vemail:{
        type:String,
        default:"NO"
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

// Generating tokens...
userSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, "mynameistanmoybarmanfromfalakata" );
        this.tokens = this.tokens.concat({token})
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const user = new mongoose.model('user', userSchema);


module.exports = user;