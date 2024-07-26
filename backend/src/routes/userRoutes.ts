import express from 'express';
import { DeleteProductFromCart, DeleteUser, getUserById, getUsers, handleLogin, handleRegister, UpdateUser } from '../Controller/User';
import canEditUser from '../Middleware/ValidateUserEdit';
import canEditOrder from '../Middleware/ValidateOrderEdit';
import { Schemas, validateSchema } from '../Middleware/Validation';

const router = express.Router();

router.post('/register', handleRegister)
router.post('/login', validateSchema(Schemas.user.login, 'body'), handleLogin)
router.get('/', canEditOrder, getUsers )
router.get('/:id', getUserById)
router.patch('/:id', canEditUser, UpdateUser)
router.delete('/user/:id', canEditUser, DeleteUser)
router.delete('/product/:productId/:userId', DeleteProductFromCart)
export default router;
