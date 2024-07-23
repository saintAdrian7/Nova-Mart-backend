import mongoose, { Schema, Document } from 'mongoose';
import { Order } from '../Interfaces/Order';

export interface IOrder extends Order, Document {}

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'NovaMartUser', required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { 
      type: String, 
      required: true, 
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
