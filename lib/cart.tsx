'use client'
import { useSession } from "next-auth/react"
import React, { createContext, useContext } from "react"
import { getAllProductsInUserCart, ifUSerhasProductInCart } from "./getDetails"

interface Props{
    selectedProductsInCart: any[]
    addProductToCart: (id:number) => void
    setSelectedProductsInCart: React.Dispatch<React.SetStateAction<any>>;
}
const CartContext = createContext<Props>({
    selectedProductsInCart: [],
    addProductToCart: (id: number) => {},
    setSelectedProductsInCart: () => {}
})

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [selectedProductsInCart, setSelectedProductsInCart] = React.useState<any[]>([])
    const {data:session} = useSession()
    const userId = session?.user.id

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

    React.useEffect(()=>{
        const fetchData = async () => {
            const uniqueUserProducts = await getAllProductsInUserCart(userId)
            setSelectedProductsInCart(uniqueUserProducts)
            

        }
        fetchData()
    },[])


    return (
        <CartContext.Provider value={{selectedProductsInCart, addProductToCart, setSelectedProductsInCart}}>
            {children}
        </CartContext.Provider>
    )
} 

export const useCart =():Props=> useContext(CartContext)