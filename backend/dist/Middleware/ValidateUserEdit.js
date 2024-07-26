"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../Services/User");
const canEditUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'You are not logged in!' });
    }
    const decoded = (0, User_1.verifyToken)(token);
    if ((decoded === null || decoded === void 0 ? void 0 : decoded.role) !== 'ADMIN' && req.params.id !== (decoded === null || decoded === void 0 ? void 0 : decoded.id)) {
        return res.status(401).json({ message: 'You are not allowed to edit this user' });
    }
    next();
};
exports.default = canEditUser;
