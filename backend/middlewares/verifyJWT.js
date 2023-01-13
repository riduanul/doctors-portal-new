const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.status(401).json({message: "Unauthorize access!"})
    } 

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, function( err, decoded) {
        if(err){
            return res.status(403).json({message: "Forbidden access!"})
        }else{
            req.decoded = decoded;
            next()
        }
    })

}


module.exports = verifyJWT;