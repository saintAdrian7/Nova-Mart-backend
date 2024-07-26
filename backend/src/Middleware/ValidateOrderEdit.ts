import { Jwt } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../Services/User";


const canEditOrder = (req:Request, res:Response, next:NextFunction) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Token not found.'})
    }
    const decoded = verifyToken(token)
    if(!decoded){
        return res.status(401).json({message: 'Invalid token.'})
    }
    if(decoded.role !== 'ADMIN'){
        return res.status(401).json({message: 'You are not an Admin'})
    }
    next()

}
export default canEditOrder