import mongoose from "mongoose";
export interface User {
    role:"ADMIN" | "USER",
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    image:string,
    products: mongoose.Types.ObjectId[];
    orders: mongoose.Types.ObjectId[];
    cart: mongoose.Types.ObjectId[];
}