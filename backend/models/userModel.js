const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username : {
        type: String,
        require: true,
        trim: true
    }, 
    email: {
        type: String,
        require: true,
        trim: true,
    }, 
    password:{
        type:String,
    }, 
    role:{
        type: String,
        enum:["user", "admin"],
        default: "user"
    }
})

userSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10, (err, hash)=> {
        if(err) return next(err);
        this.password = hash;
        next();
    })
})

const User = mongoose.model("User", userSchema);

module.exports = User