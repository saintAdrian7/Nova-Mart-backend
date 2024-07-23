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
exports.handleRegister = handleRegister;
exports.handleLogin = handleLogin;
exports.getUserById = getUserById;
exports.UpdateUser = UpdateUser;
exports.DeleteUser = DeleteUser;
exports.getUsers = getUsers;
const User_1 = require("../Services/User");
const User_2 = require("../Utils/User");
function handleRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const registeredUser = yield (0, User_1.createUser)(user);
            const token = (0, User_1.generateToken)(registeredUser);
            res.status(200).json({ message: "Successfully registered user",
                user: {
                    id: registeredUser._id,
                    firstName: registeredUser.firstName,
                    lastName: registeredUser.lastName,
                    email: registeredUser.email,
                },
                token: token
            });
        }
        catch (error) {
            if (error.message.includes("E11000 duplicate key error collection")) {
                res.status(409).json({ message: "User with email already exists", error: error.message });
            }
            else {
                res.status(500).json({ message: "Unable to register User", error: error.message });
            }
        }
    });
}
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const Details = req.body;
        try {
            const user = yield (0, User_1.logInUser)(Details);
            const token = (0, User_1.generateToken)(user);
            res.status(200).json({ message: "Successfully logged in", user: user, token: token });
        }
        catch (error) {
            if (error instanceof User_2.invalidEmailorPasswordError) {
                res.status(401).json({ message: "Invalid email or password", error: error.message });
            }
            else {
                res.status(500).json({ message: "Unable to log in", error: error.message });
            }
        }
    });
}
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            if (!id) {
                return res.status(400).json({ message: "User id is required" });
            }
            const user = yield (0, User_1.getUser)(id);
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            res.status(200).json({ message: "user retrived",
                user: {
                    _id: user._id,
                    role: user.role,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: user.image,
                    products: user.products,
                    cart: user.cart,
                    orders: user.orders
                }
            });
        }
        catch (error) {
            res.status(500).json({ message: "Unable to get user", error: error.message });
        }
    });
}
function UpdateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const updateData = req.body;
        try {
            if (!id) {
                return res.status(400).json({ message: "User id is required" });
            }
            const user = yield (0, User_1.updateUser)(id, updateData);
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            res.status(200).json({ message: "user updated",
                user: {
                    _id: user._id,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: user.image,
                    products: user.products,
                    cart: user.cart,
                    orders: user.orders
                }
            });
        }
        catch (error) {
            res.status(500).json({ message: "Unable to update user", error: error.message });
        }
    });
}
function DeleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            if (!id) {
                return res.status(400).json({ message: "User id is required" });
            }
            const user = yield (0, User_1.deleteUser)(id);
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            res.status(200).json({ message: "user deleted", });
        }
        catch (error) {
            res.status(500).json({ message: "Unable to delete user", error: error.message });
        }
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, User_1.getAllUsers)();
            res.status(200).json({ message: "users fetched", users });
        }
        catch (error) {
            res.status(500).json({ message: "Unable to get users", error: error.message });
        }
    });
}
