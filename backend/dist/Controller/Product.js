"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostProduct = PostProduct;
exports.GetAllProducts = GetAllProducts;
exports.GetProduct = GetProduct;
exports.UpdateProduct = UpdateProduct;
exports.DeleteProduct = DeleteProduct;
exports.GetProductsByCategory = GetProductsByCategory;
exports.GetMostPopularProducts = GetMostPopularProducts;
exports.GetRecentlyAddedProducts = GetRecentlyAddedProducts;
const Product_1 = require("../Services/Product");
function PostProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = req.body;
        try {
            const createdProduct = yield (0, Product_1.createProduct)(product);
            res.status(200).json({
                message: 'Product created successfully',
                createdProduct: {
                    _id: createdProduct._id,
                    Name: createdProduct.Name,
                    price: createdProduct.price,
                    Description: createdProduct.description,
                    image: createdProduct.image,
                    DiscountedPrice: createdProduct.DiscountedPrice,
                    CashPrice: createdProduct.CashPrice,
                    Category: createdProduct.Category,
                    Seller: createdProduct.Seller,
                    Image: createdProduct.image,
                    Rating: createdProduct.Rating,
                    Reviews: createdProduct.Reviews
                }
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Unable to create product at this time', error: error.message });
        }
    });
}
function GetAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield (0, Product_1.getAllProducts)();
            const formattedProducts = products.map((product) => ({
                _id: product._id,
                Name: product.Name,
                price: product.price,
                Description: product.description,
                DiscountedPrice: product.DiscountedPrice,
                CashPrice: product.CashPrice,
                Category: product.Category,
                Seller: product.Seller,
                Image: product.image,
                Rating: product.Rating,
                Reviews: product.Reviews
            }));
            res.status(200).json({ message: 'Retrieved products successfully', products });
        }
        catch (error) {
            res.status(500).json({ message: 'Unable to get products at this time', error: error.message });
        }
    });
}
function GetProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            if (!id) {
                return res.status(400).json({ message: "Product id is required" });
            }
            const product = yield (0, Product_1.getOneProduct)(id);
            if (!product) {
                res.status(404).json({ message: "Product with that id was no found" });
            }
            else {
                res.status(200).json({ message: "Product retrived successfully", product });
            }
        }
        catch (error) {
            res.status(500).json({ message: "unable tor retrive product at this time", error: error.message });
        }
    });
}
function UpdateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const updateData = req.body;
        try {
            if (!id) {
                return res.status(400).json({ message: "Product id is required to update" });
            }
            const updatedProduct = yield (0, Product_1.updateProduct)(id, updateData);
            if (!updatedProduct) {
                res.status(404).json({ message: "The product with the id was not found" });
            }
            else {
                res.status(200).json({ message: "Product successfully updated", updatedProduct });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Unable to update product at this time", error: error.message });
        }
    });
}
function DeleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            if (!id) {
                return res.status(400).json({ message: 'Product id is required to delete product' });
            }
            const deletedProduct = yield (0, Product_1.deleteProduct)(id);
            if (!deletedProduct) {
                res.status(404).json({ message: "The product with that id was not found" });
            }
            else {
                res.status(200).json({ message: "Successfuly deleted the product" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Unable to delete Product at this time", error: error.message });
        }
    });
}
function GetProductsByCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = req.params.category;
        try {
            const products = yield (0, Product_1.getProductsByCategory)(category);
            res.status(200).json({ message: "Retrieved products successfully", products });
        }
        catch (error) {
            res.status(500).json({ message: "Unable to get products at this time", error: error.message });
        }
    });
}
function GetMostPopularProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield (0, Product_1.getMostPopularProducts)();
            res.status(200).json({ message: "Retrieved most popular products successfully", products });
        }
        catch (error) {
            res.status(500).json({ message: "Unable to get products at this time", error: error.message });
        }
    });
}
function GetRecentlyAddedProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield (0, Product_1.getRecentlyAddedProducts)();
            res.status(200).json({ message: "Retrieved recently added products successfully", products });
        }
        catch (error) {
            res.status(500).json({ message: "Unable to get products at this time", error: error.message });
        }
    });
}
