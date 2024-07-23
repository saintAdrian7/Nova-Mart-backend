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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.getOrders = getOrders;
exports.getUserOrder = getUserOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
function createOrder(orderData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = new OrderModel_1.default(orderData);
            return yield order.save();
        }
        catch (error) {
            console.error(error.message);
            throw new Error("Error creating order");
        }
    });
}
function getOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield OrderModel_1.default.find().populate('user').populate('products.product');
            return orders;
        }
        catch (error) {
            throw error;
        }
    });
}
function getUserOrder(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield OrderModel_1.default.findOne({ user: userId }).populate('user').populate('products.product');
            if (!order) {
                throw new Error("The Order does not exist");
            }
            return order;
        }
        catch (error) {
            console.error(error.message);
            throw new Error("Error retrieving order");
        }
    });
}
function updateOrder(orderId, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedOrder = yield OrderModel_1.default.findByIdAndUpdate(orderId, updateData, { new: true })
                .populate('user')
                .populate('products.product');
            if (!updatedOrder) {
                throw new Error("The Order does not exist");
            }
            return updatedOrder;
        }
        catch (error) {
            console.error(error.message);
            throw new Error("Error updating order");
        }
    });
}
function deleteOrder(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedOrder = yield OrderModel_1.default.findByIdAndDelete(orderId)
                .populate('user')
                .populate('products.product');
            if (!deletedOrder) {
                throw new Error("The Order does not exist");
            }
            return deletedOrder;
        }
        catch (error) {
            console.error(error.message);
            throw new Error("Error deleting order");
        }
    });
}
