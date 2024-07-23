import { Response, Request } from "express";
import { createUser, deleteUser, generateToken, getAllUsers, getUser, logInUser, updateUser } from "../Services/User";
import { IUser } from "../models/UserModel";
import { invalidEmailorPasswordError } from "../Utils/User";



export async function handleRegister(req:Request, res:Response){
    const user = req.body
    try{
        const registeredUser = await createUser(user)
        const token = generateToken(registeredUser)
        res.status(200).json({message:"Successfully registered user",
            user:{
                id:registeredUser._id,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email,
                
            },
            token:token
        })

    }catch(error:any){
        if(error.message.includes("E11000 duplicate key error collection")){
            res.status(409).json({message:"User with email already exists", error:error.message})
        }else{
            res.status(500).json({message: "Unable to register User", error:error.message})
        }
    }
}

export async function handleLogin(req:Request, res:Response) {
    const Details = req.body
    try{
        const user:IUser = await logInUser(Details)
        const token = generateToken(user)
        res.status(200).json({message:"Successfully logged in", user:user, token:token})   

    }catch(error:any){
        if(error instanceof invalidEmailorPasswordError){
            res.status(401).json({message:"Invalid email or password", error:error.message})
        }else{
            res.status(500).json({message:"Unable to log in", error:error.message})
        }

    }
}

export async function getUserById(req:Request, res:Response){
    const id = req.params.id
    try{
        if(!id){
           return  res.status(400).json({message:"User id is required"})
        }
        const user = await getUser(id)
        if(!user) {
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user retrived", 
            user:{
                _id:user._id,
                role:user.role,
                email:user.email,
                firstName:user.firstName,
                lastName: user.lastName,
                image:user.image,
                products:user.products,
                cart: user.cart,
                orders: user.orders
                    
            }
        })


        
    }catch(error:any){
        res.status(500).json({message:"Unable to get user", error:error.message})
    }

}


export async function UpdateUser(req:Request, res:Response){
    const id = req.params.id
    const updateData = req.body
    try{
        if(!id){
            return res.status(400).json({message:"User id is required"})
        }
        const user = await updateUser(id, updateData)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user updated", 
            user:{
                _id:user._id,
                role:user.role,
                firstName:user.firstName,
                lastName: user.lastName,
                image:user.image,
                products:user.products,
                cart: user.cart,
                orders: user.orders
                    
            }
        })

     }catch(error:any){
        res.status(500).json({message:"Unable to update user", error:error.message})
    }
}

export async function DeleteUser(req:Request, res:Response) {
    const id = req.params.id
    try{
        if(!id){
            return res.status(400).json({message:"User id is required"})
        }
        const user = await deleteUser(id)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user deleted",})

    }catch(error:any){
        res.status(500).json({message:"Unable to delete user", error:error.message})
    }
}

export async function getUsers(req:Request, res:Response) {
    try{
        const users = await getAllUsers()
        res.status(200).json({message:"users fetched", users})

    }catch(error:any){
        res.status(500).json({message:"Unable to get users", error:error.message})
    }
}