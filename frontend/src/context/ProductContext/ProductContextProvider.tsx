import React, { ReactNode, useReducer } from "react";
import { initialState, ProductContext, ProductReducer } from "./ProductContextConsts";



export const ProductProvider:React.FC<{children: ReactNode}> = ({children}) => {
    const [productState, dispatch] = useReducer(ProductReducer, initialState)
    return (
        <ProductContext.Provider value={{productState, dispatch}} >
            {children}
        </ProductContext.Provider>
    )
}