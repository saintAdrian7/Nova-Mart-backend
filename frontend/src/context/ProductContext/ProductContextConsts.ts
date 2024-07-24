import { createContext, useContext } from "react";
import { Product } from "../../Models/Models";


export interface ProductSliceState {
    products: Product[] | null;
    loading: boolean;
    error: boolean;
    category: string | null;
}


export type Action =
    | { type: 'POST REQUEST' }
    | { type: 'POST SUCCESS', payload: Product }
    | { type: 'POST FAILURE' }
    | { type: 'FETCH REQUEST' }
    | { type: 'FETCH SUCCESS', payload: Product[] }
    | { type: 'FETCH FAILURE' }
    | { type: 'DELETE REQUEST' }
    | { type: 'DELETE SUCCESS', payload: string }
    | { type: 'DELETE FAILURE' }
    | { type: 'UPDATE REQUEST' }
    | { type: 'UPDATE SUCCESS', payload: Product }
    | { type: 'UPDATE FAILURE' }
    | { type: 'FETCH_BY_CATEGORY REQUEST' }
    | { type: 'FETCH_BY_CATEGORY SUCCESS', payload: Product[] }
    | { type: 'FETCH_BY_CATEGORY FAILURE' }
    | { type: 'FETCH_POPULAR REQUEST' }
    | { type: 'FETCH_POPULAR SUCCESS' }
    | { type: 'FETCH_POPULAR FAILURE' }
    | { type: 'FETCH_RECENT REQUEST' }
    | { type: 'FETCH_RECENT SUCCESS' }
    | { type: 'FETCH_RECENT FAILURE' };


export const initialState: ProductSliceState = {
    products: null,
    loading: false,
    error: false,
    category: null
};

export const ProductContext = createContext<{
    productState: ProductSliceState;
    dispatch: React.Dispatch<Action>;
}>({ productState: initialState, dispatch: () => null });


export const ProductReducer = (state: ProductSliceState, action: Action): ProductSliceState => {
    switch (action.type) {
        case 'POST REQUEST':
        case 'FETCH REQUEST':
        case 'DELETE REQUEST':
        case 'UPDATE REQUEST':
        case 'FETCH_BY_CATEGORY REQUEST':
        case 'FETCH_POPULAR REQUEST':
        case 'FETCH_RECENT REQUEST':
            return { ...state, loading: true, error: false };
        case 'POST SUCCESS':
            return { ...state, loading: false, error: false, products: state.products ? [...state.products, action.payload] : [action.payload] };
        case 'FETCH_POPULAR SUCCESS':
        case 'FETCH_RECENT SUCCESS':
        return {...state, loading:false, error:false}
        case 'FETCH SUCCESS':
        case 'FETCH_BY_CATEGORY SUCCESS':
            return { ...state, loading: false, error: false, products: action.payload };
        case 'DELETE SUCCESS':
            return { ...state, loading: false, error: false, products: state.products ? state.products.filter(product => product._id !== action.payload) : null };
        case 'UPDATE SUCCESS':
            return {
                ...state, loading: false, error: false, products: state.products
                    ? state.products.map(product => product._id === action.payload._id ? action.payload : product)
                    : null
            };
        case 'POST FAILURE':
        case 'FETCH FAILURE':
        case 'DELETE FAILURE':
        case 'UPDATE FAILURE':
        case 'FETCH_BY_CATEGORY FAILURE':
        case 'FETCH_POPULAR FAILURE':
        case 'FETCH_RECENT FAILURE':
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

export const useProduct = () => useContext(ProductContext);
