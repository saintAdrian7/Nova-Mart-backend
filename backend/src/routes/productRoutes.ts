import express from 'express';
import { DeleteProduct, GetAllProducts, GetMostPopularProducts, GetProduct, GetProductsByCategory, GetRecentlyAddedProducts, PostProduct, UpdateProduct } from '../Controller/Product';
const router = express.Router();


router.post('/', PostProduct)
router.get('/', GetAllProducts)
router.get('/product/:id',GetProduct)
router.get('/category/:category', GetProductsByCategory)
router.get('/popular', GetMostPopularProducts)
router.get('/recent', GetRecentlyAddedProducts)
router.patch('/:id', UpdateProduct)
router.delete('/:id', DeleteProduct)
export default router;
