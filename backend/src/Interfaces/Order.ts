export interface Order  {
    user: string
    products: {
      product:string
      quantity: number;
    }[];
    totalAmount: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  }