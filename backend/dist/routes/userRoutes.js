"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../Controller/User");
const router = express_1.default.Router();
router.post('/register', User_1.handleRegister);
router.post('/login', User_1.handleLogin);
router.get('/', User_1.getUsers);
router.get('/:id', User_1.getUserById);
router.patch('/:id', User_1.UpdateUser);
router.delete('/:id', User_1.DeleteUser);
exports.default = router;
