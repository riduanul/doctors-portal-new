const Doctor = require('../models/doctorModel')

const getDoctor = async(req, res) => {
    const query = {}
    const doctor = await Doctor.find({})
    res.status(200).json({
        success: true,
        doctor
    })
}

const addDoctor = async(req, res) => {
   const doctorsData = req.body;
   const doctor = await Doctor.create(doctorsData)

   if(doctor){
    res.status(200).json({
        success: true,
        doctor,
    })
   }else{
    res.status(500).json({
        message: "somthing went wrong!"
    })
   }

}

const deleteDoctor = async(req, res) => {
    const id = req.params.id;
    const filter = {_id : id};
    const result = await Doctor.deleteOne(filter);
    res.status(200).json({
        result
    })
}

module.exports = {getDoctor, addDoctor, deleteDoctor}