'use client'
import React, { createContext, useContext } from "react"

interface Props{
    selectedProductsInCart: any[]
    addProductToCart: (id:number) => void
}
const CartContext = createContext<Props>({
    selectedProductsInCart: [],
    addProductToCart: (id: number) => {}
})

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [selectedProductsInCart, setSelectedProductsInCart] = React.useState<any[]>([])

    const addProductToCart = (id:number) => {
        const existingProduct = selectedProductsInCart.find((product) => product.id === id)
        
        if(existingProduct === undefined){
            setSelectedProductsInCart([...selectedProductsInCart, {id, quantity: 1} ])
            
        }else{
            setSelectedProductsInCart(selectedProductsInCart.map((product) => product.id === id ? {...product, quantity: product.quantity + 1} : product))
        }
        console.log("id",id)
        console.log("selectedProduct",selectedProductsInCart)
    };

    return (
        <CartContext.Provider value={{selectedProductsInCart, addProductToCart}}>
            {children}
        </CartContext.Provider>
    )
} 

export const useCart =():Props=> useContext(CartContext)