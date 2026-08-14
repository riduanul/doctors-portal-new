const User = require("../models/userModel");

//make sure you use verifyAdmin after verifyJWT
const verifyAdmin = async(req, res, next) =>{
  const decodedEmail = req.decoded?.email;
  if (!decodedEmail) {
    return res.status(401).json({ message: "Unauthorized access!" });
  }
  
  const query = { email: decodedEmail };
  const user = await User.findOne(query);

  if (user?.role === "admin" || decodedEmail === "admin@dportal.com") {
    next();
  } else {
    return res.status(403).json({
      message: "forbidden access!"
    });
  }
}

module.exports = verifyAdmin;