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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostPopularProducts = exports.getRecentlyAddedProducts = exports.getProductsByCategory = void 0;
exports.createProduct = createProduct;
exports.getAllProducts = getAllProducts;
exports.getOneProduct = getOneProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const User_1 = require("../Utils/User");
function createProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const savedProduct = new ProductModel_1.default(product);
            return savedProduct.save();
        }
        catch (error) {
            throw new User_1.UnableToSaveUserError(error.message);
        }
    });
}
const getProductsByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductModel_1.default.find({ Category: category });
        return products;
    }
    catch (error) {
        throw new Error(`Unable to get products by category: ${error.message}`);
    }
});
exports.getProductsByCategory = getProductsByCategory;
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield ProductModel_1.default.find().populate('reviews').populate('Seller');
            return products;
        }
        catch (error) {
            throw error;
        }
    });
}
function getOneProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield ProductModel_1.default.findById(id).populate('reviews').populate('Seller');
            if (!product) {
                throw new Error("Product with that id does not exist");
            }
            else {
                return product;
            }
        }
        catch (error) {
            throw error;
        }
    });
}
function updateProduct(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedProduct = yield ProductModel_1.default.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true
            });
            if (!updatedProduct) {
                throw new Error('Product with that id was not found');
            }
            else {
                return updatedProduct;
            }
        }
        catch (error) {
            throw error;
        }
    });
}
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedProduct = yield ProductModel_1.default.findByIdAndDelete(id);
            if (!deletedProduct) {
                throw new Error("Product with that id does not exist");
            }
            else {
                return deletedProduct;
            }
        }
        catch (error) {
            throw error;
        }
    });
}
const getRecentlyAddedProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductModel_1.default.find({}).sort({ createdAt: -1 }).limit(10);
        return products;
    }
    catch (error) {
        throw new Error(`Unable to get recently added products: ${error.message}`);
    }
});
exports.getRecentlyAddedProducts = getRecentlyAddedProducts;
const getMostPopularProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductModel_1.default.find({}).sort({ Rating: -1 }).limit(10);
        return products;
    }
    catch (error) {
        throw new Error(`Unable to get most popular products: ${error.message}`);
    }
});
exports.getMostPopularProducts = getMostPopularProducts;
