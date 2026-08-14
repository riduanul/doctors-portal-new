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
    },
    experience: {
        type: Number,
        default: 0
    },
    biography: {
        type: String,
        default: ""
    },
    qualifications: {
        type: [String],
        default: []
    },
    fees: {
        type: Number,
        default: 500
    },
    rating: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        default: ""
    },
    availableDays: {
        type: [String],
        default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
}, { timestamps: true })

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;