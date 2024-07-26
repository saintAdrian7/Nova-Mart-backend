"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../Services/User");
const canEditOrder = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found.' });
    }
    const decoded = (0, User_1.verifyToken)(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
    if (decoded.role !== 'ADMIN') {
        return res.status(401).json({ message: 'You are not an Admin' });
    }
    next();
};
exports.default = canEditOrder;
