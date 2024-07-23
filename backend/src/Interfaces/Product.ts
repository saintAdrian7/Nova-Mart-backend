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