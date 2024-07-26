"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../Controller/User");
const ValidateUserEdit_1 = __importDefault(require("../Middleware/ValidateUserEdit"));
const ValidateOrderEdit_1 = __importDefault(require("../Middleware/ValidateOrderEdit"));
const Validation_1 = require("../Middleware/Validation");
const router = express_1.default.Router();
router.post('/register', User_1.handleRegister);
router.post('/login', (0, Validation_1.validateSchema)(Validation_1.Schemas.user.login, 'body'), User_1.handleLogin);
router.get('/', ValidateOrderEdit_1.default, User_1.getUsers);
router.get('/:id', User_1.getUserById);
router.patch('/:id', ValidateUserEdit_1.default, User_1.UpdateUser);
router.delete('/user/:id', ValidateUserEdit_1.default, User_1.DeleteUser);
router.delete('/product/:productId/:userId', User_1.DeleteProductFromCart);
exports.default = router;
