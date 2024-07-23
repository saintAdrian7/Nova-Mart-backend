import Order, { IOrder } from "../models/OrderModel";


export async function createOrder(orderData: Partial<IOrder>): Promise<IOrder> {
    try {
      const order = new Order(orderData);
      return await order.save();
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error creating order");
    }
  }

export async function getOrders():Promise <IOrder[]>{
    try{
        const orders = await Order.find().populate('user').populate('products.product')
        return orders
    }catch(error:any){
        throw error
    }
}


export async function getUserOrder(userId: string): Promise<IOrder | null> {
    try {
      const order = await Order.findOne({ user: userId }).populate('user').populate('products.product');
      
      if (!order) {
        throw new Error("The Order does not exist");
      }
  
      return order;
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error retrieving order");
    }
  }

  export async function updateOrder(orderId: string, updateData: Partial<IOrder>): Promise<IOrder | null> {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true })
        .populate('user')
        .populate('products.product');
  
      if (!updatedOrder) {
        throw new Error("The Order does not exist");
      }
  
      return updatedOrder;
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error updating order");
    }
  }
  

  export async function deleteOrder(orderId: string): Promise<IOrder | null> {
    try {
      const deletedOrder = await Order.findByIdAndDelete(orderId)
        .populate('user')
        .populate('products.product');
  
      if (!deletedOrder) {
        throw new Error("The Order does not exist");
      }
  
      return deletedOrder;
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error deleting order");
    }
  }
  