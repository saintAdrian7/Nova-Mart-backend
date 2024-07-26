"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = require("../Controller/Order");
const ValidateOrderEdit_1 = __importDefault(require("../Middleware/ValidateOrderEdit"));
const router = express_1.default.Router();
router.post('/', Order_1.createOrderController);
router.get('/', ValidateOrderEdit_1.default, Order_1.getOrdersController);
router.get('/:userId', Order_1.getUserOrderController);
router.get('/delivered/:userId', Order_1.GetDeliveredOrders);
router.patch('/:orderId', ValidateOrderEdit_1.default, Order_1.updateOrderController);
router.delete('/:orderId', ValidateOrderEdit_1.default, Order_1.deleteOrderController);
exports.default = router;
