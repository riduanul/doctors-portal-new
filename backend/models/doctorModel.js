const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true,
    },
    speciality: {
        type: String,
        require: true,
        
    }
    
   
            
})

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;