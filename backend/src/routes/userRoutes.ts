import express from 'express';
import { DeleteProductFromCart, DeleteUser, getUserById, getUsers, handleLogin, handleRegister, UpdateUser } from '../Controller/User';
const router = express.Router();

router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.get('/', getUsers )
router.get('/:id', getUserById)
router.patch('/:id', UpdateUser)
router.delete('/user/:id', DeleteUser)
router.delete('/product/:productId/:userId', DeleteProductFromCart)
export default router;
