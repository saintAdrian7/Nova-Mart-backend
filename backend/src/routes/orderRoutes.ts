import express from 'express';
import { createOrderController, getUserOrderController, updateOrderController, deleteOrderController, getOrdersController, GetDeliveredOrders } from '../Controller/Order'
import canEditOrder from '../Middleware/ValidateOrderEdit';

const router = express.Router();

router.post('/', createOrderController);
router.get('/', canEditOrder, getOrdersController)
router.get('/:userId', getUserOrderController);
router.get('/delivered/:userId', GetDeliveredOrders)
router.patch('/:orderId', canEditOrder, updateOrderController);
router.delete('/:orderId', canEditOrder, deleteOrderController);

export default router;
