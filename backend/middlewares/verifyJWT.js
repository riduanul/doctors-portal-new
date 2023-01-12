const verifyJWT = (req, res, next) => {
    console.log('token inseide verifyJWT Funciton', req.headers.authorization)
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.status(401).json({message: "Unauthorize access!"})
    } 

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, function( err, doceoded) {
        if(err){
            return res.status(403).json({message: "Forbidden access!"})
        }else{
            req.decoded = decoded;
            next()
        }
    })

}


module.exports = verifyJWT;