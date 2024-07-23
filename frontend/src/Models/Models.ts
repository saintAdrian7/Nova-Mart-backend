export type User = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    image:string,
    role: 'ADMIN' | 'USER'
    products: Product[],
    orders: Order[],
    cart: Product[]
}

export interface LoginUserPayload {
    email: string,
    password: string
}

export interface RegisterUserPayload {
    firstName: string;
    lastName: string;
    role: 'ADMIN'| 'USER'
    email: string;
    password: string;
    image: string
    
}

export interface FetchUserPayload{
    userId:string,
    property:'loggedInUser' | 'profileUser'
}

export interface Order  {
    _id:string
    user: string
    products: {
      product:Product;
      quantity: number;
    }[];
    totalAmount: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  }

  export interface Product {
    Name:string,
    price:number,
    description:string,
    image:string[],
    DiscountedPrice?:number,
    CashPrice:number,
    Category: 'Electronics'|'Fashion'|'Home'|'Books'|'Sports'|'Beauty'|'Toys'|'Groceries'|'Automotive'|'Health',
    Seller:string

}