
import jwt from "jsonwebtoken" 

let verifyAuth = (req, res, next) => {
    //read headers
    let token = req.get('token');

    jwt.verify(token, 'secret', (err, decoded) => {
        if(err){
            return res.status(401).json({
                mensaje: 'Token error',
                err
            })
        }
        req.user = decoded.data;
    })
    console.log(token);
    next();
}

const verifyRole = (req, res, next) => {
    let role = req.user.role;

    console.log(role);
    
    if(role !== 'ADMIN'){
        return res.status(401).json({
            mensaje: 'Role not authorized!'
        })
    }
    
    next();
}

module.exports = {verifyAuth, verifyRole} ;