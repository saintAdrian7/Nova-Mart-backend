import { Product, searchParams } from "../Interfaces/Product";
import ProductModel, { IProduct } from "../models/ProductModel";
import { UnableToSaveUserError } from "../Utils/User";



export async function createProduct (product:Product):Promise <IProduct>{
    try{
        const savedProduct = new ProductModel(product)
        return savedProduct.save()

    }catch(error:any){
        throw new UnableToSaveUserError(error.message)

    }
}
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
      const products = await ProductModel.find({ Category: category });
      return products;
    } catch (error:any) {
      throw new Error(`Unable to get products by category: ${error.message}`);
    }
  };




export async function getAllProducts ():Promise <IProduct[]>{
    try{
    const products = await ProductModel.find().populate('reviews').populate('Seller')
    return products 
    }catch(error:any){
        throw error
    }

}

export async function getOneProduct (id:string):Promise <IProduct>{
    try{
        const product = await ProductModel.findById(id).populate('reviews').populate('Seller')
       if(!product){
        throw new Error("Product with that id does not exist")
       }else{
        return product
       }

    }catch(error:any){
        throw error
    }

}

export async function updateProduct (id:string, updateData:Partial<IProduct>):Promise <IProduct>{
    try{
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, {
            new:true,
            runValidators:true
        })
        if(!updatedProduct){
            throw new Error('Product with that id was not found')
        }else{
            return updatedProduct
        }

    }catch(error:any){
        throw error

    }
}

export async function deleteProduct (id:string):Promise <IProduct | void>{
    try{
        const deletedProduct = await ProductModel.findByIdAndDelete(id)
        if(!deletedProduct){
            throw new Error("Product with that id does not exist")
        }else{
            return deletedProduct
        }

    }catch(error:any){
          throw error
    }
}


export const getRecentlyAddedProducts = async (): Promise<Product[]> => {
    try {
        const products = await ProductModel.find({}).sort({ createdAt: -1 }).limit(10); 
        return products;
    } catch (error:any) {
        throw new Error(`Unable to get recently added products: ${error.message}`);
    }
};

export const getMostPopularProducts = async (): Promise<Product[]> => {
    try {
        const products = await ProductModel.find({}).sort({ Rating: -1 }).limit(10); 
        return products;
    } catch (error:any) {
        throw new Error(`Unable to get most popular products: ${error.message}`);
    }
};


export const handleSearchQuery = async (params:searchParams): Promise<Product[] | null> => {
    const {
        query,
        category,
        minPrice,
        maxPrice,
        minRating,
        maxRating,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        page=1,
        limit=10,   
    } = params

    try{
        const searchConditions:any = {}
        if(query){
            searchConditions.$or = [
                {Name: new RegExp(query, 'i')},
                {Description: new RegExp(query, 'i')}
            ]
        }
        if(category){
            searchConditions.Category = category
        }
        if(minPrice !== undefined || maxPrice !== undefined){
            searchConditions.DiscountedPrice = {}
            if(minPrice !== undefined){
                searchConditions.DiscountedPrice.$gte = minPrice
            }
            if(maxPrice !== undefined){
                searchConditions.DiscountedPrice.$lte = maxPrice
            }
        }
        if(minRating !== undefined || maxRating !== undefined){
            if(minRating !==undefined){
                searchConditions.ratings.$gte = minRating 
            } 
            if(maxRating !== undefined){
                searchConditions.ratings.$lte = maxRating
            }
        }
        const sortOptions:any = {}
        if(sortBy){
            sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }
      const products = await ProductModel.find(searchConditions)
      .sort(sortOptions)
      .skip((page-1)* limit)
      .limit(limit)
      .exec()
      return products
    }catch(error:any){
        throw new Error(`Unable to handle search query: ${error.message}`)
    }


}