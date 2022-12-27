const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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
        defalut: "user"
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User,