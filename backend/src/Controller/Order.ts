import { Request, Response } from 'express';
import { createOrder, deleteOrder, getOrders, getUserOrder, updateOrder } from '../Services/Order';




export async function createOrderController(req: Request, res: Response) {
  const orderData = req.body;

  try {
    if (!orderData.user || !orderData.products || !orderData.totalAmount) {
      return res.status(400).json({ message: "User, products, and total amount are required" });
    }

    const newOrder = await createOrder(orderData);

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Unable to create order", error: error.message });
  }
}



export async function getUserOrderController(req: Request, res: Response) {
  const userId = req.params.userId;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const order = await getUserOrder(userId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order retrieved", order });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Unable to get order", error: error.message });
  }
}


export async function updateOrderController(req: Request, res: Response) {
    const orderId = req.params.orderId;
    const updateData = req.body;
  
    try {
      if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
      }
  
      const updatedOrder = await updateOrder(orderId, updateData);
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order updated", order: updatedOrder });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Unable to update order", error: error.message });
    }
  }
  
  export async function deleteOrderController(req: Request, res: Response){
    const orderId = req.params.orderId;
  
    try {
      if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
      }
  
      const deletedOrder = await deleteOrder(orderId);
  
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order deleted", order: deletedOrder });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Unable to delete order", error: error.message });
    }
  }
  

  export async function getOrdersController(req: Request, res: Response){
    try {
        const orders = await getOrders();
        res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: "Unable to retrieve orders", error: error.message });
    }
}