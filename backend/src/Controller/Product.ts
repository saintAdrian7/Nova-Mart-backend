import { Request, Response } from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../Services/Product";

export async function PostProduct (req:Request, res:Response){
    const product = req.body
    try{
         await createProduct(product)
        res.status(200).json({message:'Product created successfully'})

    }catch(error:any){
        res.status(500).json({message:'Unable to create product at this time', error:error.message})

    }
}

export async function GetAllProducts (req:Request, res:Response){
    try{
        const products = await getAllProducts()
        res.status(200).json({message:"Retrived product successfully", products})

    }catch(error:any){
        res.status(500).json({message:"Unable to get products at this time", error:error.message})

    }
}

export async function GetProduct (req:Request, res:Response){
    const id = req.params.id
    try{
        if(!id){
            return res.status(400).json({message:"Product id is required"})
        }
        const product = await getOneProduct(id)
        if(!product){
            res.status(404).json({message:"Product with that id was no found"})
        }else{
            res.status(200).json({message:"Product retrived successfully", product})
        }

    }catch(error:any){
        res.status(500).json({message:"unable tor retrive product at this time", error: error.message})

    }
}

export async function UpdateProduct(req:Request, res:Response){
    const id = req.params.id
    const updateData = req.body
    try{
        if(!id){
            return res.status(400).json({message:"Product id is required to update"})
        }
        const updatedProduct = await updateProduct(id, updateData)
        if(!updatedProduct){
          res.status(404).json({message:"The product with the id was not found"})
        }else{
            res.status(200).json({message:"Product successfully updated", updatedProduct})
        }

    }catch(error:any){
        res.status(500).json({message:"Unable to update product at this time",error: error.message})

    }
}

export async function DeleteProduct(req:Request, res:Response){
    const id = req.params.id
    try{
        if(!id){
            return res.status(400).json({message:'Product id is required to delete product'})
        }
        const deletedProduct = await deleteProduct(id)
        if(!deletedProduct){
            res.status(404).json({message:"The product with that id was not found"})
        }else{
            res.status(200).json({message:"Successfuly deleted the product"})
        }

    }catch(error:any){
         res.status(500).json({message:"Unable to delete Product at this time", error: error.message})
    }
}