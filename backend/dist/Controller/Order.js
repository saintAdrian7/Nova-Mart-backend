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
exports.createOrderController = createOrderController;
exports.getUserOrderController = getUserOrderController;
exports.updateOrderController = updateOrderController;
exports.deleteOrderController = deleteOrderController;
exports.getOrdersController = getOrdersController;
exports.GetDeliveredOrders = GetDeliveredOrders;
const Order_1 = require("../Services/Order");
function createOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderData = req.body;
        try {
            if (!orderData.user || !orderData.products || !orderData.totalAmount) {
                return res.status(400).json({ message: "User, products, and total amount are required" });
            }
            const newOrder = yield (0, Order_1.createOrder)(orderData);
            res.status(201).json({ message: "Order created successfully", order: newOrder });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Unable to create order", error: error.message });
        }
    });
}
function getUserOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }
            const order = yield (0, Order_1.getUserOrder)(userId);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json({ message: "Order retrieved", order });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Unable to get order", error: error.message });
        }
    });
}
function updateOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderId = req.params.orderId;
        const updateData = req.body;
        try {
            if (!orderId) {
                return res.status(400).json({ message: "Order ID is required" });
            }
            const updatedOrder = yield (0, Order_1.updateOrder)(orderId, updateData);
            if (!updatedOrder) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json({ message: "Order updated", order: updatedOrder });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Unable to update order", error: error.message });
        }
    });
}
function deleteOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderId = req.params.orderId;
        try {
            if (!orderId) {
                return res.status(400).json({ message: "Order ID is required" });
            }
            const deletedOrder = yield (0, Order_1.deleteOrder)(orderId);
            if (!deletedOrder) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json({ message: "Order deleted", order: deletedOrder });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Unable to delete order", error: error.message });
        }
    });
}
function getOrdersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield (0, Order_1.getOrders)();
            res.status(200).json({ message: "Orders retrieved successfully", orders });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Unable to retrieve orders", error: error.message });
        }
    });
}
function GetDeliveredOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }
            const orders = yield (0, Order_1.getOrderHistory)(userId);
            res.status(200).json({ message: "Orders retrieved successfully", orders });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Unable to retrieve orders", error: error.message });
        }
    });
}
