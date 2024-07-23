"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = require("../Controller/Product");
const router = express_1.default.Router();
router.post('/', Product_1.PostProduct);
router.get('/', Product_1.GetAllProducts);
router.get('/:id', Product_1.GetProduct);
router.patch('/:id', Product_1.UpdateProduct);
router.delete('/:id', Product_1.DeleteProduct);
exports.default = router;
