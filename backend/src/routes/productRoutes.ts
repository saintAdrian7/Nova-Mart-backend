import express from 'express';
import { DeleteProduct, GetAllProducts, GetProduct, PostProduct, UpdateProduct } from '../Controller/Product';
const router = express.Router();


router.post('/', PostProduct)
router.get('/', GetAllProducts)
router.get('/:id',GetProduct)
router.patch('/:id', UpdateProduct)
router.delete('/:id', DeleteProduct)
export default router;
