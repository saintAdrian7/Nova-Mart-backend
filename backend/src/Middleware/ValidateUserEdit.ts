
import { Response, Request, NextFunction } from "express";

import { verifyToken } from "../Services/User";


const canEditUser =  (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'You are not logged in!'})
    }
   
        const decoded = verifyToken(token)
        if(decoded?.role !== 'ADMIN' && req.params.id !== decoded?.id ){
            return res.status(401).json({message: 'You are not allowed to edit this user'})
        }
        next()

   

}

export default canEditUser