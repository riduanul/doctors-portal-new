const User = require("../models/userModel");

//make sure you use verifyAdmin after verifyJWT
const verifyAdmin = async(req, res, next) =>{
  const decodedEmail = req.decoded.email;
  const query = {email: decodedEmail}
    const user = await User.findOne(query)

    if(user?.role !== "admin"){
        return res.status(500).json({
            message: "forbidden access!"
        })
    }
    next()
}

module.exports = verifyAdmin;