import express from 'express';
import { DeleteUser, getUserById, getUsers, handleLogin, handleRegister, UpdateUser } from '../Controller/User';
const router = express.Router();

router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.get('/', getUsers )
router.get('/:id', getUserById)
router.patch('/:id', UpdateUser)
router.delete('/:id', DeleteUser)
export default router;
