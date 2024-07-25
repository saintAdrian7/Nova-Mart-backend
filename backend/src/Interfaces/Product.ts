export interface Product {
    Name:string,
    price:number,
    description:string,
    image:string[],
    DiscountedPrice?:number,
    CashPrice:number,
    Category: 'Electronics'|'Fashion'|'Home'|'Books'|'Sports'|'Beauty'|'Toys'|'Groceries'|'Automotive'|'Health',
    Seller:string,
    Rating: number,
    Reviews: string[]
}

export interface searchParams {
    query? :string,
    category? :string,
    minPrice?:number,
    maxPrice?:number,
    minRating?:number,
    maxRating?:number,
    sortBy? : 'price' | 'createdAt' | 'rating',
    sortOrder? : 'asc' | 'desc',
    page?:number,
    limit? :number
}