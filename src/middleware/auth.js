const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwt_secret = process.env.JWT_SECRET;

const generateToken = async(id) =>{
    const token = await jwt.sign({id:id}, jwt_secret, {expiresIn:"1h"});
    return token;
}

const verifyToken = async(req, res, next) => {
try {
        const tokenHeader = req.headers.authorization;
        if(!tokenHeader.startsWith("Bearer ")){
            return res.status(401).send({message:"Invalid Token"})
        }
        const token = tokenHeader.split(" ")[1];
        if(!token){
            return res.status(404).send({message:"Token not found"});
        }
            const decode = await jwt.verify(token, jwt_secret);

            if(!decode){
                return res.status(401).send({message:"You are not have access"})
            }

            req.user = decode;
            next();
        } catch (error) {
            return res.status(401).send({message:"token Error"})
        }
}


module.exports = { generateToken, verifyToken }