export const verifyJWT= (req, res, next) => {
    console.log('token inseide verifyJWT Funciton', req.headers.authorization)
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.status(401).json({message: "Unauthorize access!"})
    } 

    const token = authHeader.split(' ')[1];
    
    next()
}