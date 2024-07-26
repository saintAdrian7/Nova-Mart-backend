import Joi,{ObjectSchema} from "joi";
import { NextFunction, Request, Response } from "express";

import { User } from "../Interfaces/User";
import { IUser } from "../models/UserModel";


export function validateSchema(schema: ObjectSchema, property:string){
    return async(req:Request, res:Response, next:NextFunction)=>{
        try{
           switch(property){
            case 'query':
                await schema.validateAsync(req.query);
                break;
            case 'params':
                await schema.validateAsync(req.params);
                break;
            default:
                await schema.validateAsync(req.body);
            
           }
           next()
        }catch(error){
            return res.status(422).json({message:"Object validation failed, please include a valid object"})

        }
    }
}

export const Schemas = {
    user: {
        create:Joi.object<User>({
            role:Joi.string().valid('USER', 'ADMIN'),
            firstName:Joi.string().required(),
            lastName:Joi.string().required(),
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string().required(),
            image:Joi.string().required
        }),
        login:Joi.object<{email:string, password: string}>({
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string().required()
             
        }),
        userId: Joi.object<{userId:string}>({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update:Joi.object<IUser>({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            role:Joi.string().valid('ADMIN', 'USER'),
            firstName:Joi.string(),
            lastName:Joi.string(),
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
            password: Joi.string()
        })


    }
}

export default {}