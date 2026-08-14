const Doctor = require('../models/doctorModel')

const getDoctor = async(req, res) => {
    const query = {}
    const doctor = await Doctor.find({})
    res.status(200).json({
        success: true,
        doctor
    })
}

const getDoctorById = async(req, res) => {
    try {
        const id = req.params.id;
        const doctor = await Doctor.findById(id);
        if(doctor) {
            res.status(200).json({ success: true, doctor });
        } else {
            res.status(404).json({ success: false, message: "Doctor not found" });
        }
    } catch(err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const addDoctor = async(req, res) => {
   const doctorsData = req.body;
   try {
       const doctor = await Doctor.create(doctorsData)
       if(doctor){
        res.status(200).json({
            success: true,
            doctor,
        })
       }else{
        res.status(500).json({
            message: "Something went wrong!"
        })
       }
   } catch(err) {
       res.status(500).json({ message: err.message });
   }
}

const updateDoctor = async(req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const doctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });
        if(doctor) {
            res.status(200).json({ success: true, doctor });
        } else {
            res.status(404).json({ success: false, message: "Doctor not found" });
        }
    } catch(err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const deleteDoctor = async(req, res) => {
    try {
        const id = req.params.id;
        const filter = {_id : id};
        const result = await Doctor.deleteOne(filter);
        res.status(200).json({
            result
        })
    } catch(err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = {getDoctor, getDoctorById, addDoctor, updateDoctor, deleteDoctor}